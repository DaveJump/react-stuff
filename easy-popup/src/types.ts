import { string } from 'prop-types'

export const positions = ['top', 'right', 'bottom', 'left', 'center'] as const

export type Positions = typeof positions[number]

export type PortalProps = React.PropsWithChildren<{
  node?: HTMLElement
}>

export type PopupProps = React.PropsWithChildren<
  { node?: HTMLElement }
  & typeof defaultProps
>

export const defaultProps = {
  visible: false,
  position: "center" as Positions,
  mask: true,
  maskClosable: false,
  customClassName: string,
  onClose: () => { },
  destroyOnClose: false,
}
