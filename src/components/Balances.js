import React, { useState, useEffect } from 'react'
import { Box, Split } from '@aragon/ui'
import { formatEther } from '@ethersproject/units'


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


  return (
      <>
        <Box>
            <div>hey! here's your wallets link balance, fetched straight from ethereum.</div>
            <div> {props.ethBalance === undefined
            ? "..."
            : props.ethBalance === null
            ? "Error"
            : `Ξ${parseFloat(formatEther(props.ethBalance)).toPrecision(4)}`} ETH</div>
        </Box>
      </>
  )
}

export default Balances