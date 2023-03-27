import React from 'react';
export type WidgetState = {
    ownerAddress?: {
        address: string;
        lastRequest: string;
    };
    foundNft?: string;
};
export type WidgetStateSetter = (key: keyof WidgetState, value: WidgetState[typeof key]) => void;
type Context = {
    widgetState: null | WidgetState;
    setWidgetState: WidgetStateSetter;
};
export declare const WalletChatContext: React.Context<Context | null>;
export {};
