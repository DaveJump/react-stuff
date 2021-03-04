import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes, { string } from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var Portal = function Portal(_ref) {
  var node = _ref.node,
      children = _ref.children;
  var defaultNodeRef = useRef(null);
  useEffect(function () {
    return function () {
      if (defaultNodeRef.current) {
        document.body.removeChild(defaultNodeRef.current);
      }
    };
  }, []);
  if (!canUseDOM) return null;

  if (!node && !defaultNodeRef.current) {
    var defaultNode = document.createElement('div');
    defaultNode.classList.add('easy-popup__portal');
    defaultNodeRef.current = defaultNode;
    document.body.appendChild(defaultNode);
  }

  return ReactDOM.createPortal(children, node || defaultNodeRef.current);
};

Portal.propTypes = {
  node: canUseDOM ? /*#__PURE__*/PropTypes.instanceOf(HTMLElement) : PropTypes.any,
  children: PropTypes.node
};

var positions = ['top', 'right', 'bottom', 'left', 'center'];
var defaultProps = {
  visible: false,
  position: "center",
  mask: true,
  maskClosable: false,
  customClassName: string,
  onClose: function onClose() {},
  destroyOnClose: false
};

var prefixCls = 'easy-popup'; // Animation duration

var duration = 300; // Mapping of animations

var animations = {
  bottom: prefixCls + "-slide-up",
  right: prefixCls + "-slide-left",
  left: prefixCls + "-slide-right",
  top: prefixCls + "-slide-down",
  center: prefixCls + "-fade"
};

var Popup = function Popup(props) {
  var _classnames;

  // DOM will not mount until 'visible' first time becomes 'true'
  var firstRenderRef = useRef(false);
  var visible = props.visible;
  if (!firstRenderRef.current && !visible) return null;

  if (!firstRenderRef.current) {
    firstRenderRef.current = true;
  }

  var node = props.node,
      mask = props.mask,
      maskClosable = props.maskClosable,
      onClose = props.onClose,
      customClassName = props.customClassName,
      position = props.position,
      destroyOnClose = props.destroyOnClose,
      children = props.children; // 蒙层点击事件

  var onMaskClick = function onMaskClick() {
    if (maskClosable) {
      onClose();
    }
  }; // 拼接容器节点类名


  var rootCls = classnames(prefixCls, customClassName, prefixCls + "__" + position); // 拼接蒙层节点类名

  var maskCls = classnames(prefixCls + "-mask", (_classnames = {}, _classnames[prefixCls + "-mask--visible"] = mask, _classnames)); // 拼接内容节点类名

  var contentCls = classnames(prefixCls + "-content", prefixCls + "-content__" + position); // 内容过渡动画

  var contentAnimation = animations[position];
  return React.createElement(Portal, {
    node: node
  }, React.createElement("div", {
    className: rootCls
  }, React.createElement(CSSTransition, {
    in: visible,
    timeout: duration,
    classNames: prefixCls + "-fade",
    appear: true
  }, React.createElement("div", {
    className: maskCls,
    onClick: onMaskClick
  })), React.createElement(CSSTransition, {
    in: visible,
    timeout: duration,
    classNames: contentAnimation,
    unmountOnExit: destroyOnClose,
    appear: true
  }, React.createElement("div", {
    className: contentCls
  }, children))));
};

Popup.propTypes = {
  visible: PropTypes.bool,
  position: /*#__PURE__*/PropTypes.oneOf(positions),
  mask: PropTypes.bool,
  maskClosable: PropTypes.bool,
  onClose: PropTypes.func,
  destroyOnClose: PropTypes.bool,
  stopScrollUnderMask: PropTypes.bool
};
Popup.defaultProps = defaultProps;

export { Popup, Portal };
//# sourceMappingURL=easy-popup.esm.js.map
