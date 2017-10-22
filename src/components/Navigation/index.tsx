import Preact from "#preact"
import { connect } from "preact-redux"
import { route } from "preact-router"

import { TitleActions } from "#redux/actions"
import { Link } from "./Link"

import "./Navigation.scss"

const items = [
  { name: "Featured", path: "/featured" },
  { name: "Recently Added", path: "/recent" },
  { name: "Best of Catch-Up", path: "/catch-up" },
  { name: "Subscription", path: "/subscription" },
  { name: "Collections", path: "/collections" },
  { name: "Browse", path: "/browse" }
]

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
