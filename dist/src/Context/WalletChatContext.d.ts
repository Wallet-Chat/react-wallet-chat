import React from 'react';
export type WidgetState = {
    ownerAddress: string;
};
export type WidgetStateSetter = (key: keyof WidgetState, value: WidgetState[typeof key]) => void;
type Context = {
    widgetState: null | WidgetState;
    setWidgetState: WidgetStateSetter;
};
export declare const WalletChatContext: React.Context<Context | null>;
export {};
