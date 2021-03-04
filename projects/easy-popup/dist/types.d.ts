/// <reference types="react" />
export declare const positions: readonly ["top", "right", "bottom", "left", "center"];
export declare type Positions = typeof positions[number];
export declare type PortalProps = React.PropsWithChildren<{
    node?: HTMLElement;
}>;
export declare type PopupProps = React.PropsWithChildren<{
    node?: HTMLElement;
} & typeof defaultProps>;
export declare const defaultProps: {
    visible: boolean;
    position: "top" | "right" | "bottom" | "left" | "center";
    mask: boolean;
    maskClosable: boolean;
    customClassName: import("prop-types").Requireable<string>;
    onClose: () => void;
    destroyOnClose: boolean;
};
