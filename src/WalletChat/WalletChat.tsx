import React from 'react'
import classNames from 'classnames'
import ButtonOverlay from '@/src/ButtonOverlay'
import { WalletChatContext } from '@/src/Context'
import { parseNftFromUrl } from '@/src/utils'
import styles from './WalletChat.module.css'
import { ConnectedWallet } from '@/src/types'

const URL = 'https://staging.walletchat.fun'

const iframeId = styles['wallet-chat-widget']

// TODO: possibly make a lib for type-safe postMessage APIs
function postMessage(data: null | boolean | object) {
  if (typeof document === 'undefined') return

  const iframeElement = document?.getElementById(iframeId) as HTMLIFrameElement

  iframeElement?.contentWindow?.postMessage(data, '*')
}

function trySignIn(connectedWallet?: null | ConnectedWallet) {
  if (typeof connectedWallet !== 'undefined' && connectedWallet !== null) {
    const isInjected = Boolean(connectedWallet.walletName === window.ethereum)

    if (isInjected) {
      postMessage({
        target: 'sign_in',
        data: { isInjected },
      })
    } else {
      const { walletName, account, } = connectedWallet

      postMessage({ target: 'sign_in', data: { walletName, account, }, })
    }
  } else {
    postMessage({ target: 'sign_in', data: null })
  }
}

export default function WalletChatWidget({ connectedWallet }: { connectedWallet?: ConnectedWallet }) {
  const previousUrlSent = React.useRef('')
  const nftInfoForContract = React.useRef<
    null | (ReturnType<typeof parseNftFromUrl> & { ownerAddress?: string })
  >(null)
  const widgetSignedIn = React.useRef(false)

  // this is used for receive message effect without triggering the effect
  const widgetOpen = React.useRef(false)

  const widgetContext = React.useContext(WalletChatContext)
  const { widgetState, setWidgetState } = widgetContext || {}
  const { ownerAddress } = widgetState || {}

  const [isOpen, setIsOpen] = React.useState(widgetOpen.current)
  const [numUnread, setNumUnread] = React.useState(0)

  const clickHandler = () => {
    setIsOpen((prev) => {
      const wasOpen = Boolean(prev)

      postMessage({ target: 'widget_open', data: !wasOpen })

      if (nftInfoForContract.current && !wasOpen) {
        postMessage({ ...nftInfoForContract.current, redirect: true })
      }

      nftInfoForContract.current = null
      widgetOpen.current = !wasOpen
      return !wasOpen
    })
  }

  React.useEffect(() => {
    if (isOpen && !widgetSignedIn.current) {
      trySignIn(connectedWallet || null)
    }
  }, [connectedWallet, isOpen])

  React.useEffect(() => {
    if (!ownerAddress?.address) return
    const address = ownerAddress.address

    const nftInfo = parseNftFromUrl(window.location.href)
    if (nftInfo.network) {
      nftInfoForContract.current = {
        ...nftInfo,
        ownerAddress: address,
      }
    }

    // if was able to retrieve the NFT info for the page -- send to that DM page
    if (nftInfoForContract.current) {
      postMessage({ ...nftInfoForContract.current, redirect: true })
    } else {
      // otherwise send to regular DM page
      postMessage({ ownerAddress: address })
    }

    setIsOpen(true)
  }, [ownerAddress])

  React.useEffect(() => {
    const sendContractInfo = () => {
      if (window.location.href === previousUrlSent.current) return

      previousUrlSent.current = window.location.href

      const nftInfo = parseNftFromUrl(window.location.href)

      if (setWidgetState) setWidgetState('foundNft', JSON.stringify(nftInfo))

      if (nftInfo.network) {
        nftInfoForContract.current = nftInfo
      }

      postMessage(nftInfo)
    }

    const observer = new MutationObserver(sendContractInfo)
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

      if (data.closeWidget) {
        clickHandler()
      }

      if (data.target === 'sign_in' && setWidgetState) {
        // received message that is already signed in -> no need to keep trying
        widgetSignedIn.current = data.data
      }

      if (widgetOpen.current) {
        postMessage({ target: 'widget_open', data: true })
      }
    }

    window.addEventListener('message', handleMsg)

    return () => window.removeEventListener('message', handleMsg)
  }, [])

  return (
    <div
      className={classNames(styles['wallet-chat-widget__container'], {
        [styles['wallet-chat-widget__container--open']]: isOpen,
      })}
    >
      <iframe
        title='WalletChat'
        name='WalletChat'
        id={iframeId}
        className={classNames('', {
          [styles['widget-is-open']]: isOpen,
          [styles['widget-is-closed']]: !isOpen,
        })}
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
