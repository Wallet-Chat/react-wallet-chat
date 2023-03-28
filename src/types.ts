export type ConnectedWallet = {
  walletName: string
  account: string
  chainId: number
}

export type API =
  | { target: 'sign_in'; data: null | undefined | ConnectedWallet }
  | { target: 'widget_open'; data: boolean }
  | { target: 'nft_info'; data: null | object }
