import React from 'react';
import { ConnectedWallet } from '../../src/types';
export default function WalletChatWidget({ connectedWallet, signMessage, style, }: {
    connectedWallet?: ConnectedWallet;
    signMessage?: (args?: {
        message: string;
    }) => Promise<string | `0x${string}`>;
    style?: React.CSSProperties;
}): JSX.Element;
