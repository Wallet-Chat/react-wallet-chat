import React from 'react';
import { ConnectedWallet } from '../../src/types';
export default function WalletChatWidget({ connectedWallet, requestSignature, style, }: {
    connectedWallet?: ConnectedWallet;
    requestSignature?: boolean;
    style?: React.CSSProperties;
}): JSX.Element;
