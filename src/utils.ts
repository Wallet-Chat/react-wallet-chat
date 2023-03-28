import { SiweMessage } from 'siwe'

export function parseNftFromUrl(url: string) {
  const urlWithoutProtocol = url.replace('https://', '').replace('http://', '')
  const parts = urlWithoutProtocol.split('/')
  const length = parts.length

  // Assuming url..../0x....../12345, the itemId will always come last,
  // and the contract address will always come before that
  const itemId = parts[length - 1]
  const contractAddress = parts[length - 2]

  if (url.startsWith('looksrare.org')) {
    return { itemId, contractAddress, network: 'ethereum' }
  }

  const network = parts[length - 3]

  if (length >= 5) {
    return { itemId, contractAddress, network }
  }

  if (url.startsWith('x2y2.io')) {
    if (network === 'eth') {
      return { itemId, contractAddress, network: 'ethereum' }
    }
  }

  return { contractAddress: null, itemId: null, network: null }
}

export async function doRequestSignature(
  address: string,
  chainId: number,
  nonce: string,
  signer: any
) {
  const domain = window.location.host
  const origin = window.location.protocol + domain
  const statement =
    'You are signing a plain-text message to prove you own this wallet address. No gas fees or transactions will occur.'

  const siweMessage = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: '1',
    chainId,
    nonce,
  })

  const messageToSign = siweMessage.prepareMessage()

  let signature
  try {
    signature = await signer?.signMessage(messageToSign)
  } catch (error) {
    console.log('🚨[SIWE][Failed or Rejected]:', error)
  }

  return { signature, messageToSign }
}
