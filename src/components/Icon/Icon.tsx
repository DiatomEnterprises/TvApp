import Preact from "#preact"
import { C } from "#utils"

import "./Icon.scss"

export namespace Icon {
  export interface Props {
    image: string
  }
}

export const Icon = ({ image }: Icon.Props) => {
  const src = `${C.ASSETS_URL}icons/${image}.png`
  return <img className="c-icon" src={src} alt="" />
}
