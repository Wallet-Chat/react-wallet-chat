export type ConnectedWallet = {
  walletName: string
  account: string | `0x${string}`
  chainId: number
  requestSignature?: boolean
}

export type API =
  | { target: 'sign_in'; data: null | ConnectedWallet }
  | { target: 'widget_open'; data: boolean }
  | { target: 'nft_info'; data: null | object }
  | { target: 'signed_message'; data: string }

export type FrameAPI = { target: 'nonce'; data: string }
