import React from 'react'
import classNames from 'classnames'
import ButtonOverlay from '@/src/ButtonOverlay'
import { WalletChatContext } from '@/src/Context'
import { parseNftFromUrl } from '@/src/utils'
import styles from './WalletChat.module.css'
import { API, ConnectedWallet, AppAPI } from '@/src/types'

const URL = 'https://staging.walletchat.fun'

const iframeId = styles['wallet-chat-widget']

function postMessage(data: API) {
  if (typeof document === 'undefined') return

  const iframeElement = document?.getElementById(iframeId) as HTMLIFrameElement

  iframeElement?.contentWindow?.postMessage(data, '*')
}

function trySignIn(connectedWallet?: ConnectedWallet) {
  postMessage({ target: 'sign_in', data: connectedWallet || null })
}

export default function WalletChatWidget({
  connectedWallet,
  signMessage,
}: {
  connectedWallet?: ConnectedWallet
  signMessage?: (args?: { message: string }) => Promise<string | `0x${string}`>
}) {
  const previousUrlSent = React.useRef('')
  const nftInfoForContract = React.useRef<
    null | (ReturnType<typeof parseNftFromUrl> & { ownerAddress?: string })
  >(null)
  const widgetSignedIn = React.useRef(false)
  const connectedWalletRef = React.useRef(connectedWallet)

  // this is used for receive message effect without triggering the effect
  const widgetOpen = React.useRef(false)

  const widgetContext = React.useContext(WalletChatContext)
  const { widgetState, setWidgetState } = widgetContext || {}
  const { ownerAddress } = widgetState || {}

  const [isOpen, setIsOpen] = React.useState(widgetOpen.current)
  const [numUnread, setNumUnread] = React.useState(0)

  const shouldRequestSignature = Boolean(signMessage)

  const clickHandler = () => {
    setIsOpen((prev) => {
      const wasOpen = Boolean(prev)

      postMessage({ target: 'widget_open', data: !wasOpen })

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

  React.useEffect(() => {
    if ((isOpen || shouldRequestSignature) && !widgetSignedIn.current) {
      trySignIn(
        connectedWallet && {
          ...connectedWallet,
          requestSignature: shouldRequestSignature,
        }
      )
    }
  }, [connectedWallet, isOpen, shouldRequestSignature])

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
  }, [])

  React.useEffect(() => {
    connectedWalletRef.current = connectedWallet
  }, [connectedWallet])

  React.useEffect(() => {
    const handleMsg = (e: any) => {
      const data = e.data as AppAPI

      if (data.target === 'unread_cnt') {
        setNumUnread(data.data)
      }

      if (data.target === 'message_to_sign') {
        if (signMessage && connectedWalletRef.current) {
          signMessage({ message: data.data }).then(
            (signature: string) =>
              signature &&
              postMessage({
                target: 'signed_message',
                data: { signature, signedMsg: data.data },
              })
          )
        }
      }

      if (data.target === 'close_widget') {
        clickHandler()
      }

      if (data.target === 'is_signed_in') {
        if (data.data) {
          // received message that is already signed in -> no need to keep trying
          widgetSignedIn.current = data.data
        } else if (data.data === null) {
          widgetSignedIn.current = false
          trySignIn(
            connectedWalletRef.current && {
              ...connectedWalletRef.current,
              requestSignature: Boolean(signMessage),
            }
          )
        }
      }

      if (widgetOpen.current) {
        // this is just a 'ping' message back to let the app know that it's open
        postMessage({ target: 'widget_open', data: true })
      }
    }

    window.addEventListener('message', handleMsg)

    return () => window.removeEventListener('message', handleMsg)
  }, [signMessage])

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
