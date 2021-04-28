from flask import Flask
from flask_cors import CORS, cross_origin

from dotenv import load_dotenv
import os
import requests
import json 
import pandas as pd
import datetime
from decimal import Decimal


load_dotenv() # load keys from .env file

# use app.logger.info() to see stuff logged in console

api_key = os.environ.get("ETHERSCAN_KEY")

app = Flask(__name__)



cors = CORS(app)

@app.route('/api/getTokens/<address>/', methods=['GET'])
def balances(address):
    url = f"https://api.etherscan.io/api?module=account&action=tokentx&address={address}&startblock=0&endblock=999999999&sort=desc&apikey={api_key}"
    

    api_call = requests.get(url)
    # should we add checking if this call shits the bed^
    
    tx = api_call.json().get("result")
    
    # app.logger.info('damn... thats a lotta transactions...', tx)
    
    holdings = []

    for t in tx:
        token = t.get("tokenName")
        symbol = t.get("tokenSymbol")
        value = t.get("value") # returned in WEI, need converting to eth
        tx_from = t.get("from")
        tx_to = t.get("to")
        time_stamp = t.get("timeStamp")
        time = datetime.datetime.fromtimestamp(int(time_stamp)).strftime("%Y-%d-%m %H:%M:%S")
        confirmations = t.get("confirmations")
        contract_address = t.get("contractAddress")

        status = ''
        if tx_from == address.lower(): # problems here?
            status = "Sending"
        else:
            status = "Receiving"

        
        eth_value = round(Decimal(value)/Decimal("1000000000000000000"), 5)
        
        if int(confirmations) >= 16:
            conf = "Confirmed"
        else:
            conf = "Pending"

        holdings.append({"Token": token, "Symbol": symbol, "Status": status, "From": tx_from, "To": tx_to, "TRX": conf, "Value": eth_value, "Date": time, "Contract": contract_address })

    df = pd.DataFrame(holdings)
     
    # Create a dummy variable and get Wallets token balances????
    df.loc[df["Status"] == "Sending", "Value"] *=-1
    wallet = df.groupby("Symbol").Value.sum().reset_index() 
    wallet = wallet[wallet["Value"] > 0.0001] # Get rid of most dust values
    wallet["Contract"] = df["Contract"]

    app.logger.info('wallet: ', wallet)

    return wallet.to_json(orient="records") 

    # current return format: 

    """
[  
  {
    "Symbol": "ADR",
    "Value": 1.5
  },
  {
    "Symbol": "BAT",
    "Value": 0.38
  },
]
    """

@app.route('/api/getGas/', methods=['GET'])
def gas():  
    url = f"https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey={api_key}"

    api_call = requests.get(url)
    gas = api_call.json()

    gas = gas.get("result")
    print(gas)

    app.logger.info("gas", gas)
    return gas

@app.route('/api/getTrx/<address>', methods=['GET'])
def latestTrxs(address):
    url = f"https://api.etherscan.io/api?module=account&action=tokentx&address={address}&startblock=0&endblock=999999999&sort=desc&apikey={api_key}"
    

    api_call = requests.get(url)
    # should we add checking if this call shits the bed^
    
    tx = api_call.json().get("result")
    print(tx)
    # app.logger.info('damn... thats a lotta transactions...', tx)
    
    holdings = []

    for t in tx:
        token = t.get("tokenName")
        symbol = t.get("tokenSymbol")
        value = t.get("value") # returned in WEI, need converting to eth
        tx_from = t.get("from")
        tx_to = t.get("to")
        time_stamp = t.get("timeStamp")
        time = datetime.datetime.fromtimestamp(int(time_stamp)).strftime("%Y-%d-%m %H:%M:%S")
        confirmations = t.get("confirmations")
        contract_address = t.get("contractAddress")

        status = ''
        if tx_from == address.lower(): # problems here?
            status = "Sending"
        else:
            status = "Receiving"

        
        eth_value = round(Decimal(value)/Decimal("1000000000000000000"), 5)
        
        if int(confirmations) >= 16:
            conf = "Confirmed"
        else:
            conf = "Pending"

        holdings.append({"Token": token, "Symbol": symbol, "Status": status, "From": tx_from, "To": tx_to, "TRX": conf, "Value": eth_value, "Date": time, "Contract": contract_address })
   
    df = pd.DataFrame(holdings)
    trx = df.head(10)
   
    app.logger.info("Trx", trx)
    return trx.to_json(orient="records") 

if __name__ == '__main__':
    app.run(debug=True)

# Hello Whales
