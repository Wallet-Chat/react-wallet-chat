import classnames from 'classnames'
import styles from './ButtonOverlay.module.css'

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
  return (
    <div className={styles.popupButton__container}>
      <button
        className={styles.popupButton}
        type='button'
        onClick={clickHandler}
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
