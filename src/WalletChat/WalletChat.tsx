import React from 'react'
import ButtonOverlay from '@/src/ButtonOverlay'
import { WalletChatContext } from '@/src/Context'

const URL = 'https://app.walletchat.fun'

export default function WalletChatWidget() {
  // TODO: type safe WC Context
  const wcContext = React.useContext<any>(WalletChatContext)
  const globalState = wcContext?.globalState
  const ownerAddr = globalState?.ownerAddr

  const [isOpen, setIsOpen] = React.useState(false)
  const [numUnread, setNumUnread] = React.useState(0)

  const clickHandler = (e: any) => setIsOpen((prev) => !prev)

  // if (chatAddr != undefined && chatAddr.length != 0) { url += `/dm/${chatAddr}`
  // }

  // useEffect(() => {
  //   window.addEventListener('message', (e) => {
  //     var data = e.data
  //     console.log('RECEIVED message from CHILD TO PARENT')
  //     console.log(data)
  //     if (data['target'] == 'unread_cnt') {
  //       setNumUnread(data['data'])
  //     }
  //   })
  // }, [])

  React.useEffect(() => {
    const handleMsg = (e: any) => {
      const { data } = e

      if (data.target === 'unread_cnt') {
        setNumUnread(data.data)
      }
    }

    window.addEventListener('message', handleMsg)

    return () => window.removeEventListener('message', handleMsg)
  }, [])

  if (!wcContext) {
    console.error(
      'WalletChat: ChatWithOwner component must be rendered within a WalletChatProvider'
    )
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1vh',
        right: '2vw',
        zIndex: 999,
        userSelect: 'none',
      }}
    >
      <iframe
        title='WalletChat'
        name='WalletChat'
        id='wallet-chat-widget'
        className='wallet-chat-widget'
        style={{
          height: isOpen ? '50vh' : '0px',
          width: isOpen ? '15vw' : '0px',
          minHeight: isOpen ? '440px' : '0px',
          minWidth: isOpen ? '500px' : '0px',
          borderRadius: '16px',
          overflowY: 'hidden' /* Hide vertical scrollbar */,
          overflowX: 'hidden' /* Hide horizontal scrollbar */,
          transition:
            'width ease 0.25s, min-width ease 0.25s, min-height ease 0.25s, height ease 0.25s',
          filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.5))',
        }}
        src={URL}
      />

      <ButtonOverlay
        notiVal={numUnread}
        showNoti={numUnread > 0}
        isOpen={isOpen}
        clickHandler={clickHandler}
      />
    </div>
  )
}
