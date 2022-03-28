from flask import Flask, request
from flask_login import (
    LoginManager,
    UserMixin,
    login_user,
    logout_user,
    login_required,
    current_user,
)
from flask_sqlalchemy import SQLAlchemy
from os import getenv
from passlib.hash import pbkdf2_sha256

# static_folder: location of the built frontend
# static_url_path: where static files are located relative to static_folder
app = Flask(__name__, static_folder="../frontend/build", static_url_path="/")
app.secret_key = getenv("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# https://flask-login.readthedocs.io/en/latest/#your-user-class
class User(db.Model, UserMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(36), unique=True)
    password = db.Column(db.String(256))


db.create_all()


login_manager = LoginManager()
login_manager.init_app(app)


# https://flask-login.readthedocs.io/en/latest/#how-it-works
@login_manager.user_loader
def load_user(user_id):
    if user_id:
        return db.session.get(User, user_id)
    return None


@app.route("/api/login/", methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]
    db_user = db.session.query(User).filter(User.username == username).one()
    passwords_match = pbkdf2_sha256.verify(password, db_user.password)
    if passwords_match:
        login_user(db_user)
        return {"success": True}
    return {"success": False}


@app.route("/api/register/", methods=["POST"])
def register():
    username = request.json["username"]
    password = request.json["password"]
    # https://passlib.readthedocs.io/en/stable/lib/passlib.hash.pbkdf2_digest.html#passlib.hash.pbkdf2_sha256
    password = pbkdf2_sha256.hash(password)
    user = User(username=username, password=password)
    db.session.add(user)
    db.session.commit()
    return {"success": True}


@app.route("/api/logout/", methods=["POST"])
@login_required
def logout():
    logout_user()
    return {"success": True}


@app.route("/api/getuser/", methods=["GET"])
def get_user():
    return {
        "id": current_user.id,
        "username": current_user.username,
    }


@app.route("/", methods=["GET"])
def index():
    return app.send_static_file("index.html")


# set all unknown routes to the main app
@app.errorhandler(404)
def unknown_path(e):
    return app.send_static_file("index.html")
