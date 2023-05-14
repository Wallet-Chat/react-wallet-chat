export interface ConnectedWallet {
    walletName: string;
    account: string | `0x${string}`;
    chainId: number;
}
export interface SignedMessageData {
    signature: null | string;
    signedMsg: string;
}
export interface MessagedWallet extends ConnectedWallet {
    requestSignature?: boolean;
}
export type API = {
    target: 'sign_in';
    data: null | MessagedWallet;
} | {
    target: 'nft_info';
    data: null | {
        contractAddress?: null | string;
        itemId?: null | string;
        network?: null | string;
        ownerAddress?: string;
        redirect?: boolean;
    };
} | {
    target: 'signed_message';
    data: {
        signature: null | string;
        signedMsg: string;
    };
} | {
    target: 'origin';
    data: {
        domain: string;
        origin: string;
    };
};
export type AppAPI = {
    target: 'unread_cnt';
    data: number;
} | {
    target: 'close_widget';
    data: null;
} | {
    target: 'is_signed_in';
    data: boolean;
} | {
    target: 'url_env';
    data: string;
};
