import Preact from "#preact"
import { connect } from "preact-redux"

import { Link } from "#components"
import { Events } from "#utils"

import "./Back.scss"

export class BackButtonComponent extends Preact.Component<MyRedux.Reducers.Utils, {}> {
  onClick = (next: string, prev: string) => {
    if (!this.props.back) return

    if (prev === this.props.back.path) {
      // Handle second click
    }
  }

  renderButton(Tag: any, props: any) {
    return (
      <div className="c-back_button__wrapper">
        <Tag {...props} />
      </div>
    )
  }

  render() {
    const className = "c-back_button c-chevron c-chevron--left center__vertical float__left"

    if (this.props.back) {
      const { path, map } = this.props.back
      const props = { map, path, className, onClick: this.onClick }

      return this.renderButton(Link, props)
    } else {
      return this.renderButton("div", { className })
    }
  }
}

const mapStateToProps = ({ utils }: MyRedux.State) => ({ back: utils.back })

export const BackButton = connect(mapStateToProps)(BackButtonComponent as any)
