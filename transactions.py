import requests
import json
import pandas as pd
import datetime
from decimal import Decimal


api_key = "Q175G7Z5MJNQFR99N8U527Z9CIVYA1SNQU"

address = "0xA14964479Ebf9cD336011ad80652b08CD83dFE3A"  


# --------Other possible addresses----------
# 0xE75021660E00A7FA0DF1B97da13eBAbe6D82e7ea 
# 0xaED094D187CDaA45E3c7Ccb51144032276B14173
# 0x20f7c7e4b410af0d7309a04792fc22c7b4c7f46e
# --------Other possible addresses----------


def Transactions(address):

    url = f"https://api.etherscan.io/api?module=account&action=tokentx&address={address}&startblock=0&endblock=999999999&sort=desc&apikey={api_key}"

    yolo = requests.get(url)

    address_content = yolo.json()
    result = address_content.get("result")

    # print(result)

    # timeStamp, from, to, value, 'tokenName, tokenSymbol. Create the dataframe
    data = []
    for trx in result:
        token = trx.get("tokenName")
        symbol = trx.get("tokenSymbol")
        value = trx.get("value")            # Result returned in Wei, to get value in Ether divide value/1000000000000000000
        trx_from = trx.get("from")
        to = trx.get("to")
        ts = trx.get("timeStamp")
        time = datetime.datetime.fromtimestamp(int(ts)).strftime('%Y-%d-%m %H:%M:%S')
        confirmations = trx.get("confirmations")

        if trx_from == address.lower():   # Problems here
            status = "Sending"
        else:
            status = "Receiving"

        eth_value = round(Decimal(value)/Decimal("1000000000000000000"),5)
        if int(confirmations) >=16:
            conf = "Confirmed"
        else:
            conf = "Pending"


        data.append({"Token": token, "Symbol": symbol, "Status": status, "From": trx_from, "To": to, "TRX": conf, "Value": eth_value, "Date": time})

    df = pd.DataFrame(data)
    # print(address.lower())




    # Create a dummy variable and get Wallets token balances
    for ind, row in df.iterrows():
        if row["Status"] == "Sending":
            df.loc[ind, "Dumb"] = row["Value"] * -1
        else:
            df.loc[ind, "Dumb"] = row["Value"] * 1
    print(df.head(60))

    yolo = df.groupby("Symbol").Dumb.sum() # Yolo == Token balances 

    for x in yolo: # Just to check things out, will need to filter out dust.
        print(x)

        

Transactions("0xA14964479Ebf9cD336011ad80652b08CD83dFE3A")

""" This is to see everything the address has ever held
bener = df["Token"]
print(df["Token"])

trash = []
allTimeHoldings = []
for x in bener:
    trash.append(x)
    for b in trash:
        if b not in allTimeHoldings:
            allTimeHoldings.append(b)

print(allTimeHoldings)
"""



"""
{'blockNumber': '10913205', 'timeStamp': '1600789849', 'hash': '0x855cb18df9327a4f6b720b356c77f785508e4e34bba201f334b2a9912420f8b6', 'nonce': '2115', 'blockHash': '0xf307af267afb69a9106caae3feddd3d16e96378898d11af5965489f97225a915', 'from': '0xf1e8a3999e6c3bb9a518c3ef7f9bf621586a76ff', 'contractAddress': '0xd814e02e779a216c5abaa5789e624cc017fb0876', 'to': '0xa14964479ebf9cd336011ad80652b08cd83dfe3a', 'value': 
'0', 'tokenName': 'Pink Tulip', 'tokenSymbol': 'pTLP', 'tokenDecimal': '9', 'transactionIndex': '72', 'gas': '41613', 'gasPrice': '250000000000', 'gasUsed': '27742', 'cumulativeGasUsed': '3387267', 'input': 'deprecated', 'confirmations': '1371402'}
"""
