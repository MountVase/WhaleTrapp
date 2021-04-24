import React, { useState, useEffect } from 'react'
import axios from 'axios'

// what do we want to preview on all "whales"? name? redgreen? small circlegraph?
// also, TODO:  react-router-dom for specific Whale Routes. 
// DataView component might be helpful
const WhalePreview = () => {
  const [address, setAddress] = useState()
  const [balance, setBalance] = useState()

  useEffect(() => {
    axios.get('/api/getToken/assholes/').then(response => {
      setAddress(response.data.address)
      setBalance(response.data.balance)
    })
  }, [])
  return (
    <>
      hey. 
      <div>address: {address} </div>
      <div>balance: { balance } </div>
    </>
  )
}

export default WhalePreview
