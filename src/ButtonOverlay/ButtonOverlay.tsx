import React from 'react'
import classnames from 'classnames'
import { WalletChatContext } from '@/src/Context'
import styles from './ButtonOverlay.module.css'
import classNames from 'classnames'

function getClickedNfts() {
  try {
    const clickedNfts =
      (typeof localStorage !== 'undefined' &&
        localStorage.getItem('clickedNfts')) ||
      ''

    return clickedNfts ? JSON.parse(clickedNfts) : []
  } catch (error: any) {
    return []
  }
}

function setClickedNfts(foundNft: string) {
  try {
    const clickedNfts = getClickedNfts()
    const newClickedNfts = [...clickedNfts, foundNft]

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('clickedNfts', JSON.stringify(newClickedNfts))
    }
  } catch (error: any) {
    return null
  }
}

export default function ButtonOverlay({
  notiVal,
  showNoti,
  isOpen,
  clickHandler,
}: {
  notiVal: number
  showNoti: boolean
  isOpen: boolean
  clickHandler: (e: any) => void
}) {
  const clickedNfts = getClickedNfts()

  const widgetContext = React.useContext(WalletChatContext)
  const widgetState = widgetContext?.widgetState
  const foundNft = widgetState?.foundNft
  const foundNftId = foundNft && JSON.parse(foundNft).itemId
  const shouldRing =
    !isOpen &&
    (foundNft ? !clickedNfts.includes(foundNft) && Boolean(foundNftId) : false)

  const [isRinging, setIsRinging] = React.useState(shouldRing)

  React.useEffect(() => {
    if (shouldRing) {
      setIsRinging(true)
    }
  }, [shouldRing])

  return (
    <div
      className={classNames(styles.popupButton__container, {
        [styles['popupButton__container--open']]: isOpen,
      })}
    >
      <span
        className={isRinging ? styles.ring : undefined}
        style={{ boxShadow: 'none' }}
      />

      <button
        className={styles.popupButton}
        type='button'
        onClick={(e) => {
          setIsRinging(false)
          if (foundNft) {
            setClickedNfts(foundNft)
          }
          clickHandler(e)
        }}
      >
        <div
          className={classnames(styles.icon, {
            [styles.activeIcon]: !isOpen,
            [styles.inactiveIcon]: isOpen,
          })}
        >
          <img
            alt='WalletChat'
            src='https://uploads-ssl.webflow.com/62d761bae8bf2da003f57b06/62d761bae8bf2dea68f57b52_walletchat%20logo.png'
            style={{ height: '90%' }}
          />
        </div>
        <div
          className={classnames(styles.icon, {
            [styles.activeIcon]: isOpen,
            [styles.inactiveIcon]: !isOpen,
          })}
        >
          <svg
            focusable='false'
            viewBox='0 0 16 14'
            width='28'
            height='25'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M.116 4.884l1.768-1.768L8 9.232l6.116-6.116 1.768 1.768L8 12.768.116 4.884z'
            />
          </svg>
        </div>
      </button>

      {showNoti && (
        <>
          <span className={classnames(styles.notif, styles.pinging)} />
          <span className={styles.notif}>{notiVal}</span>
        </>
      )}
    </div>
  )
}
