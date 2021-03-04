import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import classnames from 'classnames'
import Portal from './portal'
import { PopupProps, defaultProps, positions, Positions } from './types'
import './index.scss'

// Class name prefix
const prefixCls = 'easy-popup'
// Animation duration
const duration = 300
// Mapping of animations
const animations: { [key in Positions]: string } = {
  bottom: `${prefixCls}-slide-up`,
  right: `${prefixCls}-slide-left`,
  left: `${prefixCls}-slide-right`,
  top: `${prefixCls}-slide-down`,
  center: `${prefixCls}-fade`,
}

const Popup = (props: PopupProps) => {
  // DOM will not mount until 'visible' first time becomes 'true'
  const firstRenderRef = useRef(false)

  const { visible } = props

  if (!firstRenderRef.current && !visible) return null
  if (!firstRenderRef.current) {
    firstRenderRef.current = true
  }

  const {
    node,
    mask,
    maskClosable,
    onClose,
    customClassName,
    position,
    destroyOnClose,
    children,
  } = props

  // 蒙层点击事件
  const onMaskClick = () => {
    if (maskClosable) {
      onClose()
    }
  }

  // 拼接容器节点类名
  const rootCls = classnames(
    prefixCls,
    customClassName,
    `${prefixCls}__${position}`
  )

  // 拼接蒙层节点类名
  const maskCls = classnames(`${prefixCls}-mask`, {
    [`${prefixCls}-mask--visible`]: mask,
  })

  // 拼接内容节点类名
  const contentCls = classnames(
    `${prefixCls}-content`,
    `${prefixCls}-content__${position}`
  )

  // 内容过渡动画
  const contentAnimation = animations[position]

  return (
    <Portal node={node}>
      <div className={rootCls}>
        <CSSTransition
          in={visible}
          timeout={duration}
          classNames={`${prefixCls}-fade`}
          appear
        >
          <div className={maskCls} onClick={onMaskClick}></div>
        </CSSTransition>
        <CSSTransition
          in={visible}
          timeout={duration}
          classNames={contentAnimation}
          unmountOnExit={destroyOnClose}
          appear
        >
          <div className={contentCls}>{children}</div>
        </CSSTransition>
      </div>
    </Portal>
  )
}

Popup.propTypes = {
  visible: PropTypes.bool,
  position: PropTypes.oneOf(positions),
  mask: PropTypes.bool,
  maskClosable: PropTypes.bool,
  onClose: PropTypes.func,
  destroyOnClose: PropTypes.bool,
  stopScrollUnderMask: PropTypes.bool,
}

Popup.defaultProps = defaultProps

export default Popup
