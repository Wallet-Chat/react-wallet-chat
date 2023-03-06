import React from 'react'
import ButtonOverlay from '@/src/ButtonOverlay'
import { WalletChatContext } from '@/src/Context'
import styles from './WalletChat.module.css'

const URL = 'https://staging.walletchat.fun'

export default function WalletChatWidget() {
  const widgetContext = React.useContext(WalletChatContext)
  const widgetState = widgetContext?.widgetState
  const ownerAddr = widgetState?.ownerAddress

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

  if (!widgetContext) {
    console.error(
      'WalletChat: ChatWithOwner component must be rendered within a WalletChatProvider'
    )
    return null
  }

  return (
    <div className={styles['wallet-chat-widget']}>
      <iframe
        title='WalletChat'
        name='WalletChat'
        id={styles['wallet-chat-widget__container']}
        style={{
          height: isOpen ? '50vh' : '0px',
          width: isOpen ? '15vw' : '0px',
          minHeight: isOpen ? '440px' : '0px',
          minWidth: isOpen ? '500px' : '0px',
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
