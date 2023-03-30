export type ConnectedWallet = {
  walletName: string
  account: string | `0x${string}`
  chainId: number
  requestSignature?: boolean
}

// Messages the widget sends to the walletchat app
export type API =
  | { target: 'sign_in'; data: null | ConnectedWallet }
  | { target: 'widget_open'; data: boolean }
  | { target: 'nft_info'; data: null | object }
  | { target: 'signed_message'; data: { signature: string; signedMsg: string } }
  | { target: 'origin'; data: { domain: string; origin: string } }

// Messages the walletchat app sends to the widget
export type AppAPI =
  | { target: 'unread_cnt'; data: number }
  | { target: 'message_to_sign'; data: string }
  | { target: 'close_widget'; data: null }
  | { target: 'is_signed_in'; data: boolean }
