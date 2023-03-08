export declare function parseNftFromUrl(url: string): {
    itemId: string;
    contractAddress: string;
    chain: string;
    network?: undefined;
} | {
    itemId: string;
    contractAddress: string;
    network: string;
    chain?: undefined;
} | {
    contractAddress: null;
    itemId: null;
    network: null;
    chain?: undefined;
};
