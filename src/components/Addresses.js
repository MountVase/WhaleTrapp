import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableRow, TableCell, Link, TextInput, Button, Text, CircleGraph } from '@aragon/ui'

const list = ["0x", "0", "ax0", "zeroXzeroBitch"]

const Addresses = () => {
  const [text, setText] = useState('')
  const [whales, setWhales] = useState()


  return (
     <>
     <Text>Enter a new whale address that you want to trap: </Text>
      <TextInput value={text} onChange={e => setText(e.target.value)} placeholder="0x000"/>
      <Button label="Add" />

       <CircleGraph value={ 1 / 4 }/>
      <Table
    header={
      <TableRow>
        <TableHeader title="Your Whales" />
      </TableRow>
    }
    >
	{list.map(address => {
	  return (
	    <TableRow>
   	      <TableCell>
		<Link href="https://google.com">{address}</Link>
	      </TableCell>
	    </TableRow>
	  )
	})}
    </Table>
     </>
       )
}

export default Addresses
