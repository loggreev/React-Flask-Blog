from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import getenv

# static_folder: location of the built frontend
# static_url_path: where static files are located relative to static_folder
app = Flask(__name__, static_folder="../frontend/build", static_url_path="/")

app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(36), unique=True)
    password = db.Column(db.String(256))

    def __init__(self, username, password):
        self.username = username
        self.password = password


db.create_all()


@app.route("/")
def index():
    return app.send_static_file("index.html")


# set all unknown routes to the main app
@app.errorhandler(404)
def unknown_path(e):
    return app.send_static_file("index.html")
