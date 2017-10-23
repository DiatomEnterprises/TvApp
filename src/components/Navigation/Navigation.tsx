import Preact from "#preact"
import { route } from "preact-router"
import { connect } from "preact-redux"
import * as classNames from "classnames"

import { Link } from "#components"
import { TitleActions } from "#redux/actions"
import items from "./data"

import "./Navigation.scss"

const getPath = (path: string) => (path && path !== "/" ? path : items[0].path)

namespace Navigation {
  export interface Props extends MyRedux.Dispatch.Props {
    showNav: boolean
  }
}

class NavigationComponent extends Preact.Component<Navigation.Props, {}> {
  componentDidMount() {
    route(getPath(window.location.hash.substr(1)), true)
    this.props.dispatch(TitleActions.change("Catalogue", ""))
  }

  renderLink = ({ path, name }: { path: string; name: string }) => {
    const props = { path, map: "navigation", className: "c-nav__item", activeClassName: "c-focused" }
    return <Link {...props}>{name}</Link>
  }

  render() {
    const { showNav } = this.props

    return (
      <div className={classNames("c-nav__wrapper", { "c-nav__wrapper--hidden": !showNav })}>
        <div className="c-nav">{items.map(this.renderLink)}</div>
      </div>
    )
  }
}

export const Navigation = connect()(NavigationComponent as any)
