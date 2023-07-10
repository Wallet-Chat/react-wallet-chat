import React from 'react';
import { ConnectedWallet, SignedMessageData } from '../../src/types';
export default function WalletChatWidget({ connectedWallet, signedMessageData, requestSignature, connectUrl, style, }: {
    connectedWallet?: ConnectedWallet;
    signedMessageData?: SignedMessageData;
    requestSignature?: boolean;
    connectUrl?: string;
    style?: React.CSSProperties;
}): JSX.Element;
