export interface ConnectedWallet {
  walletName: string
  account: string | `0x${string}`
  chainId: number
}

export interface MessagedWallet extends ConnectedWallet {
  hasSigner?: boolean
}

// Messages the widget sends to the walletchat app
export type API =
  | { target: 'sign_in'; data: null | MessagedWallet }
  | {
      target: 'nft_info'
      data: null | {
        contractAddress?: null | string
        itemId?: null | string
        network?: null | string
        ownerAddress?: string
        redirect?: boolean
      }
    }
  | {
      target: 'signed_message'
      data: { signature: null | string; signedMsg: string }
    }
  | { target: 'origin'; data: { domain: string; origin: string } }

// Messages the walletchat app sends to the widget
export type AppAPI =
  | { target: 'unread_cnt'; data: number }
  | { target: 'message_to_sign'; data: string }
  | { target: 'close_widget'; data: null }
  | { target: 'is_signed_in'; data: boolean }
  | { target: 'url_env'; data: string }
