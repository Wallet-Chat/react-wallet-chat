import React from 'react';
export type WidgetState = {
    ownerAddress: {
        address: string;
        // -- this is used to force a state update for the same address --
        lastRequest: string;
    };
};
export type WidgetStateSetter = (key: keyof WidgetState, value: WidgetState[typeof key]) => void;
type Context = {
    widgetState: null | WidgetState;
    setWidgetState: WidgetStateSetter;
};
export declare const WalletChatContext: React.Context<Context | null>;
export {};
