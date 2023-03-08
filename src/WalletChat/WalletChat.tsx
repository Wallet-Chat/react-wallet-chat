import React from 'react'
import ButtonOverlay from '@/src/ButtonOverlay'
import { WalletChatContext } from '@/src/Context'
import { parseNftFromUrl } from '@/src/utils'
import styles from './WalletChat.module.css'

const URL = 'http://localhost:5173'

const iframeId = styles['wallet-chat-widget__container']

export default function WalletChatWidget() {
  const previousUrlSent = React.useRef('')
  const nftInfoForContract = React.useRef<any>(null)

  const widgetContext = React.useContext(WalletChatContext)
  const widgetState = widgetContext?.widgetState
  const ownerAddr = widgetState?.ownerAddress

  const [isOpen, setIsOpen] = React.useState(false)
  const [numUnread, setNumUnread] = React.useState(0)

  const clickHandler = (e: any) => {
    setIsOpen((prev) => {
      const wasOpen = Boolean(prev)

      if (nftInfoForContract.current && !wasOpen) {
        // @ts-ignore
        document
          ?.getElementById(iframeId)
          // @ts-ignore
          .contentWindow.postMessage(
            { ...nftInfoForContract.current, redirect: true },
            '*'
          )
      }

      nftInfoForContract.current = null

      return !prev
    })
  }

  React.useEffect(() => {
    const sendContractInfo = () => {
      if (window.location.href === previousUrlSent.current) return

      previousUrlSent.current = window.location.href

      const nftInfo = parseNftFromUrl(window.location.href)
      if (nftInfo.network) nftInfoForContract.current = nftInfo

      // @ts-ignore
      document
        ?.getElementById(iframeId)
        // @ts-ignore
        .contentWindow.postMessage(nftInfo, '*')
    }

    const observer = new MutationObserver(function () {
      sendContractInfo()
    })
    const config = { subtree: true, childList: true }

    sendContractInfo()

    observer.observe(document, config)
    return () => observer.disconnect()
  }, [])

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
        id={iframeId}
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
