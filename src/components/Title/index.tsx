import Preact from "#preact"

import { Header } from "./Header"
import { DateTime } from "./DateTime"

import "./Title.scss"

export const Title = () => {
  return (
    <div className="c-title">
      <Header />
      <DateTime />
    </div>
  )
}
