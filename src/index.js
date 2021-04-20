import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import { Main } from '@aragon/ui'

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}



ReactDOM.render(
  <React.StrictMode>
   <Web3ReactProvider getLibrary={getLibrary} >
    <Main>
      <App />
    </Main>
  </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

