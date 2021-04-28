import React, { useState, useEffect } from 'react'
import { Table, Text, TableRow, TableHeader, TableCell, Link } from '@aragon/ui'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../constants'

// what do we want to preview on all "whales"? name? redgreen? small circlegraph?
// also, TODO:  react-router-dom for specific Whale Routes. 
// DataView component might be helpful

const WhalePreview = () => {
  const [data, setData] = useState([])
  const { id } = useParams()
	
  useEffect(() => {
    axios.get(`${baseUrl}api/getTokens/${id}/`).then(response => {
      setData(response.data)
    })
  }, [])
  return (
    <>
     <Table
       style={{ width: '30%'}}
     >
        {data.map(entry => {
          return (
	   <>
            <TableRow>
              <TableCell>
		          <Link href={`https://coinmarketcap.com/currencies/${entry.Symbol}`}>{entry.Symbol}</Link>
              </TableCell>
              
	      <TableCell>
		 <Text>{entry.Value} </Text>		 
	       </TableCell>

            </TableRow>

	   </>
	    )
        })}
    </Table>

    </>
  )
}

export default WhalePreview
