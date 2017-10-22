import Preact from "#preact"
import { connect } from "preact-redux"
import { route } from "preact-router"

import { Link } from "#components"
import { TitleActions } from "#redux/actions"
import items from "./data"

import "./Navigation.scss"

const getPath = (path: string) => (path && path !== "/" ? path : items[0].path)

class NavigationComponent extends Preact.Component<MyRedux.Dispatch.Props, {}> {
  componentDidMount() {
    route(getPath(window.location.hash.substr(1)), true)
    this.props.dispatch(TitleActions.change("Catalogue", ""))
  }

  render() {
    return (
      <div className="c-nav">
        {items.map(({ path, name }) => (
          <Link path={path} className="c-nav__item" activeClassName="c-focused">
            {name}
          </Link>
        ))}
      </div>
    )
  }
}

export const Navigation = connect()(NavigationComponent as any)
