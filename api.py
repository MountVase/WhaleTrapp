from flask import Flask
from flask_cors import CORS, cross_origin
app = Flask(__name__)

cors = CORS(app)

# serve static html pages from here?
@app.route('/api/getToken/<address>/', methods=['GET'])
def balance(address):
     
    return {
        'address': address,
        'balance': 123132132
    }

if __name__ == '__main__':
    app.run(debug=True)
