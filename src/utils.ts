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

export function getSiweMessage(
  address: string,
  chainId: number,
  nonce: string
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
  return messageToSign
}

export function fetchWelcome(jwt?: string) {
  return fetch('api.v2.walletchat.fun/v1/welcome', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((response) => response.json())
    .then(async (welcomeData) => {
      console.log('✅[GET][Welcome]:', welcomeData.msg)

      return welcomeData.msg
    })
    .catch((welcomeError) => {
      console.log('🚨[GET][Welcome]:', welcomeError)

      return null
    })
}

export function fetchNonce(address: string) {
  return fetch(`api.v2.walletchat.fun/users/${address}/nonce`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then(async (usersData: any) => {
      console.log('✅[GET][Nonce]:', usersData)

      return usersData.Nonce
    })
    .catch((error) => {
      console.log('🚨[GET][Nonce]:', error)

      return null
    })
}
