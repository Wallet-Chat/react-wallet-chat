import { ConnectedWallet } from '../../src/types';
export default function WalletChatWidget({ connectedWallet, signMessage, }: {
    connectedWallet?: ConnectedWallet;
    signMessage?: (args?: {
        message: string;
    }) => Promise<string | `0x${string}`>;
}): JSX.Element;
