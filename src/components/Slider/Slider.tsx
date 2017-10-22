import Preact from "#preact"

import { Focusable } from "#components"

export namespace Slider {
  export interface Props {
    onClick?: Function
    onReset?: Function
    className?: string
    modifier: number
    children?: JSX.Element[]
    direction: "X" | "Y"
    size: number
    map: KeyboardMap.MapKeys
  }
}

export const Slider = ({ className, onClick, onReset, children, modifier, size, direction, map }: Slider.Props) => {
  const pos = modifier * size
  const style = { transform: `translate${direction}(${pos}px)`, opacity: 0.0000001 }
  if (pos < 0) {
    delete style.transform
  } else {
    delete style.opacity
  }

  return (
    <Focusable className={className} onClick={onClick} onReset={onReset} style={style} map={map}>
      {children}
    </Focusable>
  )
}
