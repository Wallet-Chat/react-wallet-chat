# react-wallet-chat

> Wallet Chat as a component

[![NPM](https://img.shields.io/npm/v/react-wallet-chat.svg)](https://www.npmjs.com/package/react-wallet-chat) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-wallet-chat
yarn add react-wallet-chat
```

## Usage

```jsx
import React, { Component } from 'react'

import WalletChatWidget from 'react-wallet-chat'
import 'react-wallet-chat/dist/index.css'

const [chatAddr, setChatAddr] = useState("")
const [widgetState, setWidgetState] = useState({})

class Example extends Component {
  //example use in an onClick event 
  <button onClick={()=>{
      setChatAddr(<address from your UI>)
      setWidgetState(
        {
           ...widgetState, 
          chatAddr,
          isOpen: true
        }
      )
    }}>
    Chat With Owner
 </button>
 //end example 

  render() {
    return <WalletChatWidget widgetState={widgetState}/>
  }
}
```

## Developing

Run example app to view integration

```bash
cd example && yarn run start
```

Hot reload widget itself

```bash
yarn run start
```


## License

MIT © [hjunleon](https://github.com/hjunleon)
