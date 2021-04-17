import React, { useState } from 'react'
import { Header, Button, Modal, IdentityBadge } from '@aragon/ui'
import IconEthereum from '@aragon/ui/dist/IconEthereum'

const LeftSide = () => (
    <>
      <Header primary="WhaleTrapp" />
      <img src="whale.png" width={64} height={64} />
    </>
)
  


const Navbar = (props) => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => setOpen(!open)
  
  
  const RightSide = () => {
      if (!props.address) {
        return (
            <>
              <Button onClick={toggleOpen} mode="strong" label="Wallet Connect/Login" />
              <Modal visible={open} onClose={toggleOpen}>
                  <Button mode="positive" label="connect metamask" onClick={props.ethEnabled} icon={<IconEthereum />} display="all"/>
      
              </Modal>
          </>
        )
      } else {
          return (
              <>
                <IdentityBadge entity={props.address} />
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