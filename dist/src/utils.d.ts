export declare function parseNftFromUrl(url: string): {
    itemId: string;
    contractAddress: string;
    network: string;
} | {
    contractAddress: null;
    itemId: null;
    network: null;
};
export declare function doRequestSignature(address: string, chainId: number, nonce: string, signer: any): Promise<{
    signature: any;
    messageToSign: string;
}>;
