import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableRow, TableCell, TextInput, Button, Text, CircleGraph, AddressField } from '@aragon/ui'
import { Link, useHistory } from 'react-router-dom'
import styled from "styled-components"

// this should be fetched for specific addresses
const initialList = ["0xA14964479Ebf9cD336011ad80652b08CD83dFE3A", "0xD90626F63Ddb82f39634DA594D65826120DaC01e", "0x0C18Af6D73553C481993005E78b0651dCf9C7bA3"]

const WhaleWrapper = styled.div`
  z-index: 5000;
  background-color: beige;

  cursor: pointer; 
  &:hover {
    background-color: red;
  }
`

const Whales = () => {
  const [text, setText] = useState('')
  const [whales, setWhales] = useState(initialList)
  
  const history = useHistory()

  const handleClick = () => {
    setWhales(whales => [...whales, text])
  }

  return (
     <>
     <Text>Enter a new whale address that you want to trap: </Text>
      <TextInput value={text} onChange={e => setText(e.target.value)} placeholder="0x000"/>
      <Button label="Add" onClick={handleClick} />

       <CircleGraph value={ 1 / 4 }/>
      <Table
    header={
      <TableRow>
        <TableHeader title="Your Whales" />
      </TableRow>
    }
    >
	{whales.map(address => {
	  return (
	    <TableRow>
   	      <TableCell>
             <WhaleWrapper onClick={() => history.push(`/whale/${address}`)}>
            <AddressField address={address} />
            </WhaleWrapper>
	      </TableCell>
	    </TableRow>
	  )
	})}
    </Table>
     </>
       )
}

export default Whales
