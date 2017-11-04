import Preact from "#preact"
import { connect } from "preact-redux"
import { route } from "preact-router"

import { Route } from "#utils"
import { Link } from "#components"
import { UtilsActions } from "#redux/actions"

export namespace BuyButton {
  export interface State {
    bought: boolean
  }
  export interface Props {
    base: string
    map: KeyboardMap.MapKeys
  }
}

class BuyButtonComponent extends Preact.Component<BuyButton.Props & MyRedux.Dispatch.Props, BuyButton.State> {
  onClick = (next: string, prev: string) => {
    const regex = /\/buy/
    if (prev.match(regex)) {
      const url = prev.replace(regex, "/movie/1")
      route(url)
      this.setState({ bought: true })
      this.props.dispatch(UtilsActions.focus(Route.routeToKeyboard(url)))
    }
  }

  render() {
    if (this.state.bought) return null
    const { base, map } = this.props

    const props: Link.Props = {
      map,
      path: `${base}/buy`,
      className: "c-button c-button--primary float__left",
      onClick: this.onClick
    }
    return <Link {...props}>Buy All XXX</Link>
  }
}

export const BuyButton = connect()(BuyButtonComponent as any)
