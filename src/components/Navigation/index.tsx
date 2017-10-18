import Preact from "#preact"
import * as classNames from "classnames"
import { route } from "preact-router"
import { Match } from "preact-router/match"

import "./Navigation.scss"

interface LinkProps {
  path: string
  className: string
  activeClassName: string
  children?: JSX.Element
}

const items = [
  { name: "Featured", path: "/featured" },
  { name: "Recently Added", path: "/recent" },
  { name: "Best of Catch-Up", path: "/catch-up" },
  { name: "Subscription", path: "/subscription" },
  { name: "Collections", path: "/collections" },
  { name: "Browse", path: "/browse" }
]
const Link = ({ className, activeClassName, path, children }: LinkProps) => (
  <Match path={path}>
    {({ matches }: { matches: boolean }) => (
      <div onClick={() => route(path)} className={classNames(className, { [activeClassName]: matches })}>
        {children}
      </div>
    )}
  </Match>
)

const getPath = (path: string) => (path && path !== "/" ? path : items[0].path)

export class Navigation extends Preact.Component<{}, {}> {
  componentDidMount() {
    route(getPath(window.location.hash.substr(1)), true)
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
