import React, { useState } from 'react'
import Web3 from 'web3'

import Navbar from './components/Navbar'
import Balances from './components/Balances'

const App = () => {
  const [address, setAddress] = useState()


  const ethEnabled = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      const addresses = await window.ethereum.enable();

      setAddress(addresses[0])
      return true;
    }
    return false;
  }

  return (
    <>
      <Navbar ethEnabled={ethEnabled} address={address} />
      <Balances address={address}  />
    </>
  )
}

export default App;
