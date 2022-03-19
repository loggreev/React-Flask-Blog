from flask import Flask

# static_folder: location of the built frontend
# static_url_path: where static files are located relative to static_folder
app = Flask(__name__, static_folder="../frontend/build", static_url_path="/")


@app.route("/")
def index():
    return app.send_static_file("index.html")


# set all unknown routes to the main app
@app.errorhandler(404)
def unknown_path(e):
    return app.send_static_file("index.html")
