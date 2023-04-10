import React from 'react'
import classNames from 'classnames'
import ButtonOverlay from '@/src/ButtonOverlay'
import { WalletChatContext } from '@/src/Context'
import { parseNftFromUrl } from '@/src/utils'
import styles from './WalletChat.module.css'
import { API, ConnectedWallet, MessagedWallet, AppAPI } from '@/src/types'

const URL = 'https://staging.walletchat.fun'

const iframeId = styles['wallet-chat-widget']

function postMessage(data: API) {
  if (typeof document === 'undefined') return

  const iframeElement = document?.getElementById(iframeId) as HTMLIFrameElement

  iframeElement?.contentWindow?.postMessage(data, '*')
}

function trySignIn(wallet?: MessagedWallet) {
  postMessage({ target: 'sign_in', data: wallet || null })
}

export default function WalletChatWidget({
  connectedWallet,
  requestSignature,
  style,
}: {
  connectedWallet?: ConnectedWallet
  requestSignature?: boolean
  style?: React.CSSProperties
}) {
  const [url, setUrl] = React.useState(URL)

  const previousUrlSent = React.useRef('')
  const nftInfoForContract = React.useRef<
    null | (ReturnType<typeof parseNftFromUrl> & { ownerAddress?: string })
  >(null)
  const connectedWalletRef = React.useRef(connectedWallet)
  const didSendOrigin = React.useRef(false)

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

      if (nftInfoForContract.current && !wasOpen) {
        postMessage({
          target: 'nft_info',
          data: { ...nftInfoForContract.current, redirect: true },
        })
      }

      nftInfoForContract.current = null
      widgetOpen.current = !wasOpen
      return !wasOpen
    })
  }

  const doSignIn = React.useCallback(() => {
    if (connectedWallet && (isOpen || requestSignature)) {
      trySignIn({ ...connectedWallet, requestSignature })
    }
  }, [connectedWallet, isOpen, requestSignature])

  React.useEffect(() => {
    doSignIn()
  }, [doSignIn])

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
      postMessage({
        target: 'nft_info',
        data: { ...nftInfoForContract.current, redirect: true },
      })
    } else {
      // otherwise send to regular DM page
      postMessage({ target: 'nft_info', data: { ownerAddress: address } })
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

      postMessage({ target: 'nft_info', data: nftInfo })
    }

    const observer = new MutationObserver(sendContractInfo)
    const config = { subtree: true, childList: true }

    sendContractInfo()

    observer.observe(document, config)
    return () => observer.disconnect()
  }, [setWidgetState])

  React.useEffect(() => {
    connectedWalletRef.current = connectedWallet
  }, [connectedWallet])

  React.useEffect(() => {
    const handleMsg = (e: any) => {
      const data = e.data as AppAPI

      if (!didSendOrigin.current) {
        postMessage({
          target: 'origin',
          data: {
            domain: window.location.host,
            origin: window.location.protocol + window.location.host,
          },
        })
      }

      if (data.target === 'url_env' && data.data !== URL) {
        setUrl(data.data)
      }

      if (data.target === 'unread_cnt') {
        setNumUnread(data.data)
      }

      if (data.target === 'close_widget') {
        clickHandler()
      }

      if (data.target === 'is_signed_in' && !data.data) {
        // if the user is not signed in, still send the data needed to enable log in
        doSignIn()
      }
    }

    window.addEventListener('message', handleMsg)

    return () => window.removeEventListener('message', handleMsg)
  }, [doSignIn])

  return (
    <div
      className={classNames(styles['wallet-chat-widget__container'], {
        [styles['wallet-chat-widget__container--open']]: isOpen,
      })}
      style={style}
    >
      <iframe
        title='WalletChat'
        name='WalletChat'
        id={iframeId}
        className={classNames('', {
          [styles['widget-is-open']]: isOpen,
          [styles['widget-is-closed']]: !isOpen,
        })}
        src={url}
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
