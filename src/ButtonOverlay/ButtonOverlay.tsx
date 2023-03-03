const iconStyle = {
  position: 'absolute',
  display: 'flex',
  '-webkit-box-align': 'center',
  alignItems: 'center',
  '-webkit-box-pack': 'center',
  justifyContent: 'center',
  width: '100%',
  transition: 'transform 0.16s linear 0s, opacity 0.08s linear 0s',
  opacity: 0,
  transform: 'rotate(30deg) scale(0)',
  cursor: 'pointer',
  height: '100%',
}
const activeIconStyle = {
  position: 'relative',
  opacity: 1,
  transform: 'rotate(0deg)',
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
  clickHandler: () => void
}) {
  return (
    <div
      style={{
        position: 'relative',
        marginTop: '12px',
        height: '60px',
      }}
    >
      <button
        style={{
          position: 'absolute',
          top: '0px',
          right: '0px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          cursor: 'pointer',
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden',
          overflow: 'hidden',
          '-webkit-font-smoothing': 'antialiased',
          background: 'rgb(0, 0, 0)',
          filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.5))',
        }}
        type='button'
        onClick={clickHandler}
      >
        <div style={{ ...iconStyle, ...(!isOpen ? activeIconStyle : {}) }}>
          <img
            src='https://uploads-ssl.webflow.com/62d761bae8bf2da003f57b06/62d761bae8bf2dea68f57b52_walletchat%20logo.png'
            style={{ height: '90%' }}
          />
        </div>
        <div style={{ ...iconStyle, ...(isOpen ? activeIconStyle : {}) }}>
          <svg
            focusable='false'
            viewBox='0 0 16 14'
            width='28'
            height='25'
            xmlns='http://www.w3.org/2000/svg'
            style={{
              fill: 'white',
              width: '28px',
              height: '32px',
            }}
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
        <div
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            color: 'white',
            backgroundColor: '#ff0083',
            height: '28px',
            width: '28px',
            borderRadius: '50%',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: '1.5',
          }}
        >
          {notiVal}
        </div>
      )}
    </div>
  )
}
