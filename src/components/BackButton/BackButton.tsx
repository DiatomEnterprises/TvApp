import Preact from "#preact"
import { connect } from "preact-redux"

import { Link } from "#components"
import { Events } from "#utils"

import "./BackButton.scss"

export class BackButtonComponent extends Preact.Component<MyRedux.Reducers.Utils, {}> {
  onClick = (next: string, prev: string) => {
    if (!this.props.back) return

    if (prev === this.props.back.path) {
      // Handle second click
    }
  }

  render() {
    if (!this.props.back) return null
    const { path, map } = this.props.back

    const props = {
      map,
      path,
      onClick: this.onClick,
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

const mapStateToProps = ({ utils }: MyRedux.State) => ({ back: utils.back })

export const BackButton = connect(mapStateToProps)(BackButtonComponent as any)
