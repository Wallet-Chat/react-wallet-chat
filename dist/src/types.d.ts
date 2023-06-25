export interface ConnectedWallet {
    walletName: string | undefined;
    account: string | `0x${string}` | undefined;
    chainId: number | undefined;
    provider: any;
}
export interface SignedMessageData extends ConnectedWallet {
    signature?: null | string;
    msgToSign?: string;
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
    data: null | SignedMessageData;
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
} | {
    target: 'do_parent_sign_in';
    data: string;
};
