/// <reference types="react" />
import { PortalProps } from './types';
import PropTypes from 'prop-types';
declare const Portal: {
    ({ node, children }: PortalProps): import("react").ReactPortal | null;
    propTypes: {
        node: PropTypes.Requireable<any>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
};
export default Portal;
