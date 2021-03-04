import { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { PortalProps } from './types'
import PropTypes from 'prop-types'

// Determines whether it is a browser environment
const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

const Portal = ({ node, children }: PortalProps) => {
  const defaultNodeRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    return () => {
      if (defaultNodeRef.current) {
        document.body.removeChild(defaultNodeRef.current)
      }
    }
  }, [])

  if (!canUseDOM) return null

  if (!node && !defaultNodeRef.current) {
    const defaultNode = document.createElement('div')
    defaultNode.classList.add('easy-popup__portal')
    defaultNodeRef.current = defaultNode
    document.body.appendChild(defaultNode)
  }

  return ReactDOM.createPortal(children, node || defaultNodeRef.current!)
}

Portal.propTypes = {
  node: canUseDOM ? PropTypes.instanceOf(HTMLElement) : PropTypes.any,
  children: PropTypes.node,
}

export default Portal
