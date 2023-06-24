import React from 'react';
import { ConnectedWallet, SignedMessageData } from '../../src/types';
export default function WalletChatWidget({ connectedWallet, signedMessageData, requestSignature, style, }: {
    connectedWallet?: ConnectedWallet;
    signedMessageData?: SignedMessageData;
    requestSignature?: boolean;
    style?: React.CSSProperties;
}): JSX.Element;
