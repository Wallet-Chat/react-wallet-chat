import React from 'react'
import { WalletChatContext } from '@/src/Context'

const ButtonWrapper = ({
  onClick,
  children,
}: {
  onClick: () => void
  children: any
}) => (
  <button type='button' onClick={onClick}>
    {children}
  </button>
)

const ChatWithOwner = ({
  ownerAddress,
  render,
}: {
  ownerAddress: string
  render: undefined | React.ReactElement
}) => {
  const wcContext = React.useContext(WalletChatContext)
  const setWidgetState = wcContext?.setWidgetState

  const WrapperEl = render
    ? ({ onClick, children }: { onClick: () => void; children: any }) =>
        React.cloneElement(render, { onClick }, children)
    : ButtonWrapper

  if (!wcContext) {
    console.error(
      'WalletChat: ChatWithOwner component must be rendered within a WalletChatProvider'
    )
    return null
  }

  return (
    <WrapperEl
      onClick={() =>
        setWidgetState &&
        setWidgetState('ownerAddress', {
          address: ownerAddress,
          lastRequest: Date.now().toString(),
        })
      }
    >
      <div
        style={{
          backgroundImage:
            'url(https://uploads-ssl.webflow.com/62d761bae8bf2da003f57b06/62d761bae8bf2dea68f57b52_walletchat%20logo.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '25px',
          height: '25px',
        }}
      />
      Chat with owner
    </WrapperEl>
  )
}

export default ChatWithOwner
