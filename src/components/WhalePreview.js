import React, { useState, useEffect } from 'react'
import { Table, Text, TableRow, Distribution, TableCell, Link } from '@aragon/ui'
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
    axios.get(`${baseUrl}/api/getTokens/${id}/`).then(response => {
      setData(response.data)
    })
  }, [])

  return (
    <>
    
    <Distribution 
     heading="Token distribution"
     items={data.slice(0, 5).map(entry => {
       return { item: entry.Symbol, percentage: `${entry.Value / data.reduce((prev, curr) => prev + curr.Value, 1) * 1000000}`}
     })}     
     />
     <Table
       style={{ width: '50%'}}
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
