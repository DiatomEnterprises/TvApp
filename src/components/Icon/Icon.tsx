import Preact from "#preact"
import * as classNames from "classnames"
import { _ } from "#utils"

import "./Icon.scss"

export namespace Icon {
  export interface Props {
    image: string
    tag?: string
    className?: string
    children?: JSX.Element[]
  }
}

export const Icon = ({ tag, image, className, children }: Icon.Props) => {
  const Tag = tag || "div"

  return (
    <Tag className={classNames("c-icon", `c-icon--${image}`, className)} style={_.background(`icons/${image}.png`)}>
      {children}
    </Tag>
  )
}
