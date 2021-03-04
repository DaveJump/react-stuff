import PropTypes from 'prop-types';
import { PopupProps } from './types';
import './index.scss';
declare const Popup: {
    (props: PopupProps): JSX.Element | null;
    propTypes: {
        visible: PropTypes.Requireable<boolean>;
        position: PropTypes.Requireable<"top" | "right" | "bottom" | "left" | "center">;
        mask: PropTypes.Requireable<boolean>;
        maskClosable: PropTypes.Requireable<boolean>;
        onClose: PropTypes.Requireable<(...args: any[]) => any>;
        destroyOnClose: PropTypes.Requireable<boolean>;
        stopScrollUnderMask: PropTypes.Requireable<boolean>;
    };
    defaultProps: {
        visible: boolean;
        position: "top" | "right" | "bottom" | "left" | "center";
        mask: boolean;
        maskClosable: boolean;
        customClassName: PropTypes.Requireable<string>;
        onClose: () => void;
        destroyOnClose: boolean;
    };
};
export default Popup;
