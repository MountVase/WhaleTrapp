import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'

import { NetworkConnector } from '@web3-react/network-connector'

const NETWORK_URL = process.env.REACT_APP_NETWORK_URL
// const PORTIS_ID = process.env.REACT_APP_PORTIS_ID
// const WALLETCONNECT_BRIDGE_URL = process.env.REACT_APP_WALLETCONNECT_BRIDGE_URL

export const NETWORK_CHAIN_ID  = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1')

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`)
}

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: NETWORK_URL }
})

let networkLibrary

export function getNetworkLibrary() {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider))
}

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
})

// // mainnet only
// export const walletconnect = new WalletConnectConnector({
//   rpc: { 1: NETWORK_URL },
//   bridge: WALLETCONNECT_BRIDGE_URL,
//   qrcode: true,
//   pollingInterval: 15000
// })


// // mainnet only
// export const portis = new PortisConnector({
//   dAppId: PORTIS_ID ?? '',
//   networks: [1]
// })

// mainnet only
// export const walletlink = new WalletLinkConnector({
//   url: NETWORK_URL,
//   appName: 'Uniswap',
//   appLogoUrl: UNISWAP_LOGO_URL
// })
