import React from 'react'
import { Box, Split } from '@aragon/ui'


const Balances = (props) => {
  const linkAddress = "0x514910771af9ca656af840dff83e8264ecf986ca"
   
    // The minimum ABI to get ERC20 Token balance
    let minABI = [
        // balanceOf
        {
        "constant":true,
        "inputs":[{"name":"_owner","type":"address"}],
        "name":"balanceOf",
        "outputs":[{"name":"balance","type":"uint256"}],
        "type":"function"
        },
        // decimals
        {
        "constant":true,
        "inputs":[],
        "name":"decimals",
        "outputs":[{"name":"","type":"uint8"}],
        "type":"function"
        }
    ];
    
    let linkBalance

    if (props.enabled) {
     // Get ERC20 Token contract instance
     let contract = window.web3.eth.Contract(minABI).at(props.address);
       // Call balanceOf function
     contract.balanceOf(props.address, (error, balance) => {
       // Get decimals
       contract.decimals((error, decimals) => {
         // calculate a balance
         balance = balance.div(10**decimals);
         linkBalance= balance
         });
       });
    }

  

  return (
      <>
        <Box>
            <div>hey! here's your wallets link balance, fetched straight from ethereum.</div>
            <div> (ngmi) LINK</div>
        </Box>
      </>
  )
}

export default Balances