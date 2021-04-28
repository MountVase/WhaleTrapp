import React from 'react'
import { Box, TokenAmount, Bar } from '@aragon/ui'

const TokenOverview = () => {

  return (
    <Box>
      <div>Price feed :)</div>

      <Bar>
    <TokenAmount
    address="0x6B175474E89094C44Da98b954EedeAC495271d0F"
    amount="1049228954700000000000"
    decimals={18}
    symbol="DAI"
    />
      <TokenAmount
      address="0x6B175474E89094C44Da98b954EedeAC495271d0F"
      amount="1049228954700000000000"
      decimals={18}
      symbol="DAI"
      />
      </Bar>
    </Box>
  )
}

export default TokenOverview