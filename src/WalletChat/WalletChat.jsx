import React, { useEffect, useState } from "react";
import ButtonOverlay from "../ButtonOverlay/ButtonOverlay";
// import "./WalletChat.css"
import styles from "./WalletChat.module.css";
import { getCookie } from "../utils";

const setExtChatAddr = (setState) => {
  return (addr) => {
    setState(undefined)
    setState(addr)
  }
}
const openChat = (addr) => {
}
// {chatAddr, setChatAddr, isOpen, setIsOpen}
function WalletChatWidget({ widgetState }) {
  //console.log("WalletChatWidget Render")
  //console.log(widgetState)
  const [isOpen, setIsOpen] = useState(widgetState?.isOpen)
  const [chatAddr, setChatAddr] = useState(widgetState?.chatAddr)
  const [hideIframe, setHideIframe] = useState(false);

  const [numUnread, setNumUnread] = useState(0);
  let url = process.env.REACT_APP_APP_URL || "https://v1.walletchat.fun" 
  
  useEffect(() => {
    try {
      if (widgetState?.signature) { 
        console.log("useEffect signIn")
          const authSig = {
            sig: widgetState.signature,
            derivedVia: "web3.eth.personal.sign",
            signedMessage: widgetState.messageToSign,
            address: widgetState.address.toLocaleLowerCase(),
          };
          //end SIWE and authSig
    
          //const signature = await _signer.signMessage(_nonce)
          console.log('✅[INFO][AuthSig]:', authSig)
    
          // fetch(`${process.env.REACT_APP_REST_API}/signin`, {
          //   body: JSON.stringify({ "name": widgetState.chainId.toString(), "address": widgetState.address, "nonce": widgetState.nonce, "msg": widgetState.messageToSign, "sig": widgetState.signature }),
          //   headers: {
          //   'Content-Type': 'application/json'
          //   },
          //   method: 'POST'
          // })
          // .then((response) => response.json())
          // .then(async (returnData) => {
          //   localStorage.setItem('jwt', returnData.access);
          //   //Used for LIT encryption authSign parameter
          //   localStorage.setItem('lit-auth-signature', JSON.stringify(authSig));
          //   localStorage.setItem('lit-web3-provider', widgetState.provider);
          //   console.log('✅[INFO][JWT]:', returnData.access)
          // })

          let iframe = document.getElementById("wallet-chat-widget")
          let msg = {
            "data": widgetState,
            "target": "sign_in"
        }
        
        iframe.contentWindow.postMessage(msg, url); //targertOrigin should be a .env variable
      } else {
        console.log("useEffect widgetState")
        setIsOpen(widgetState?.isOpen)
        setChatAddr(widgetState?.chatAddr)
        setHideIframe(true)
        setTimeout(() => {
          setHideIframe(false)
        }, 100)
      }
    } catch (error) {
      console.log('🚨widgetConnectError', error)
  } 
  }, [
    widgetState
  ])
  
  const clickHandler = (e) => {
    setIsOpen(!isOpen);
  };

  if (chatAddr != undefined && chatAddr.length != 0){
    url += `/dm/${chatAddr}`
  }
  console.log(`url: ${url}`);
  url = { val: url }
  useEffect(() => {
    window.addEventListener("message", (e) => {
      var data = e.data;
      //console.log("RECEIVED message from CHILD TO PARENT");
      console.log(data);
      if(data["target"] == 'unread_cnt'){
        setNumUnread(data["data"]);
      }
    });
  }, []);
  return (
    <div id={styles["wallet-chat-widget__container"]}>
      {/* {isOpen && (
                <iframe id="wallet-chat-widget" src={url}></iframe>
            )} */}
      {!hideIframe &&
      <iframe
        id="wallet-chat-widget"
        className={styles["wallet-chat-widget"]}
        style={{
          height: isOpen ? "" : "0px",
          width: isOpen ? "" : "0px",
          minHeight: isOpen ? "" : "0px",
          minWidth: isOpen ? "" : "0px",
          // display: isOpen?"block":"none"
        }}
          src={url.val}
      ></iframe>
      }
      <ButtonOverlay
        notiVal={numUnread}
        showNoti={numUnread > 0}
        isOpen={isOpen}
        clickHandler={clickHandler}
      />
    </div>
  );
}
export default
  WalletChatWidget
