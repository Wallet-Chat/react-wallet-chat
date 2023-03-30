export declare function parseNftFromUrl(url: string): {
    itemId: string;
    contractAddress: string;
    network: string;
} | {
    contractAddress: null;
    itemId: null;
    network: null;
};
