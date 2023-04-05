import React from 'react';
import { ConnectedWallet } from '../../src/types';
export default function WalletChatWidget({ connectedWallet, signMessage, requestSignature, style, }: {
    connectedWallet?: ConnectedWallet;
    signMessage?: (args?: {
        message: string;
    }) => Promise<string | `0x${string}`>;
    requestSignature?: boolean;
    style?: React.CSSProperties;
}): JSX.Element;
