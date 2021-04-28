import React, { useEffect, useState } from 'react'
import { Box, TokenAmount, Bar } from '@aragon/ui'
import styled from "styled-components"
import { baseUrl } from '../constants'
import axios from 'axios'

const StyledBox = styled(Box)`
  display: flex;
  width: 100px;
  height: 30px;
  
  &:hover {
    background-color: red;
  }

  cursor: pointer;
`

const Gas = () => {
  const [data, setData] = useState()

  useEffect(() => {
    axios.get(`${baseUrl}/api/getGas/`).then(response => {
      setData(response.data)
    })
  }, [])


  return (
    <div>
     ⛽️{data?.ProposeGasPrice}GWEI      
    </div>
  )
}

export default Gas