export declare function parseNftFromUrl(url: string): {
    itemId: string;
    contractAddress: string;
    network: string;
} | {
    contractAddress: null;
    itemId: null;
    network: null;
};
export declare function getSiweMessage(address: string, chainId: number, nonce: string): string;
export declare function fetchWelcome(jwt?: string): Promise<any>;
export declare function fetchNonce(address: string): Promise<any>;
