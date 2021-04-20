import React, { useState, useEffect } from 'react'

import Navbar from './components/Navbar'
import Balances from './components/Balances'

import { useWeb3React } from '@web3-react/core'


const App = () => {
  const context = useWeb3React()
  
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error
  } = context


  const [ethBalance, setEthBalance] = useState()

  useEffect(() => {
    console.log('running')
    if (library && account) {
      let stale = false;

      library
        .getBalance(account)
        .then(balance => {
          if (!stale) {
            setEthBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setEthBalance(null);
          }
        })

      return () => {
        stale = true;
        setEthBalance(undefined);
      }
    }
  }, [library, account, chainId])

  return (
    <>
   

        <Navbar account={account} activate={activate} active={active} />
        <Balances  ethBalance={ethBalance} />

    </>
  )
}

export default App;
