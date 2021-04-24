from flask import Flask
from flask_cors import CORS, cross_origin
app = Flask(__name__, static_folder="./build", static_url_path="/")

cors = CORS(app)

# serve static html pages from here?
@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/getToken/<address>/', methods=['GET'])
def balance(address):
     
    return {
        'address': address,
        'balance': 123132132
    }

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True)
