import React, { useState } from 'react'
import { Header, Button, Modal, IdentityBadge } from '@aragon/ui'
import IconEthereum from '@aragon/ui/dist/IconEthereum'
import { Link } from 'react-router-dom'
import Gas from './Gas'

import { injected } from './web3logic/connectors'


const LeftSide = () => (
    <>
      <Header primary="WhaleTrapp" />
      <Link to="/"> <img src="whale.png" width={64} height={64} /></Link>
    </>
)
  


const Navbar = (props) => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => setOpen(!open)
  
  const helperConnect = () => {
    props.activate(injected)
    toggleOpen()
  }
  
  const RightSide = () => {
      if (!props.active) {
        return (
            <>
     
              <Button onClick={toggleOpen} mode="strong" label="Wallet Connect/Login" />
              <Modal visible={open} onClose={toggleOpen}>
                  <Button mode="positive" label="connect metamask" onClick={() => helperConnect()} icon={<IconEthereum />} display="all"/>
              </Modal>
              <Gas />
          </>
        )
      } else {
          return (
              <>
                <IdentityBadge entity={props.account} />
              </>
          )
      }
  }




  return (
    <>
        <Header
        primary={<LeftSide />}
        secondary={<RightSide />}
      />
    </>
  )
}

export default Navbar
