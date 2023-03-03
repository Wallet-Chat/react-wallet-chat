import React from 'react'
import { WalletChatContext } from './WalletChatContext'

export function WalletChatProvider({ children }: { children: any }) {
  const [globalState, setGlobalState] = React.useState({})

  const setWidgetState = React.useCallback(
    (key: string, value: any) =>
      setGlobalState((prevState) => ({ ...prevState, [key]: value })),
    []
  )

  const providerValue = React.useMemo(
    () => ({
      globalState,
      setWidgetState,
    }),
    [globalState, setWidgetState]
  )

  return (
    <WalletChatContext.Provider value={providerValue}>
      {children}
    </WalletChatContext.Provider>
  )
}
