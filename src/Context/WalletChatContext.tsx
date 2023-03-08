import React from 'react'

export type WidgetState = {
  ownerAddress: { address: string, lastRequest: string }
}

export type WidgetStateSetter = (
  key: keyof WidgetState,
  value: WidgetState[typeof key]
) => void

type Context = {
  widgetState: null | WidgetState
  setWidgetState: WidgetStateSetter
}

export const WalletChatContext = React.createContext<null | Context>(null)
