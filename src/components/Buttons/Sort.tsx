import Preact from "#preact"
import { connect } from "preact-redux"
import * as classNames from "classnames"

import { Link } from "#components"
import { UtilsActions } from "#redux/actions"

import "./Sort.scss"

export namespace SortButton {
  export interface State {}
  export interface Props {
    base: string
    map: KeyboardMap.MapKeys
  }
  export interface ExtraProps extends Props, MyRedux.Reducers.Utils, MyRedux.Dispatch.Props {}
}

class SortButtonComponent extends Preact.Component<SortButton.ExtraProps, SortButton.State> {
  constructor() {
    super()
    this.state = { open: false }
  }

  is({ focused } = this.props) {
    return {
      nav: focused === "movies/nav",
      dropdown: focused === "movies/dropdown"
    }
  }

  opposite() {
    if (!this.props.focused) return ""

    return {
      "movies/nav": "movies/dropdown",
      "movies/dropdown": "movies/nav"
    }[this.props.focused]
  }

  onClick = (next: string, prev: string) => {
    if (prev.includes("/sort")) {
      this.props.dispatch(UtilsActions.focus(this.opposite()))
    }
  }

  render() {
    const is = this.is()
    const { base, map, sort } = this.props
    const className = classNames("float__right c-button c-button--primary c-button--sort c-chevron", {
      "c-chevron--up": is.dropdown,
      "c-chevron--down": !is.dropdown
    })

    const props: Link.Props = {
      map,
      className,
      path: `${base}/sort`,
      onClick: this.onClick
    }
    return <Link {...props}>Sort: {sort && sort.name}</Link>
  }
}

const mapStateToProps = ({ utils }: MyRedux.State) => ({ focused: utils.focused, sort: utils.sort })
export const SortButton = connect(mapStateToProps)(SortButtonComponent as any)
