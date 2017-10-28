import Preact from "#preact"

import { Link } from "#components"
import { Events } from "#utils"

import "./BackButton.scss"

const BACK_URL = "/collections/back"

export class BackButton extends Preact.Component<{}, {}> {
  onClick = (next: string, prev: string) => {
    if (prev === BACK_URL) {
      // Handle second click
    }
  }

  render() {
    const props = {
      onClick: this.onClick,
      path: BACK_URL,
      map: "back.collections",
      className: "c-back_button center__vertical float__left",
      activeClassName: "c-focused"
    }

    return (
      <div className="c-back_button__wrapper">
        <Link {...props}>
          <span className="center__both">◀</span>
        </Link>
      </div>
    )
  }
}
