import Preact from "#preact"
import { route } from "preact-router"
import { Link } from "preact-router/match"

const items = [
  { name: "Featured", path: "/featured" },
  { name: "Recently Added", path: "/recent" },
  { name: "Best of Catch-Up", path: "/catch-up" },
  { name: "Subscription", path: "/subscription" },
  { name: "Collections", path: "/collections" },
  { name: "Browse", path: "/browse" }
]

const getPath = (path: string) => (path && path !== "/" ? path : items[0].path)

export class Navigation extends Preact.Component<{}, {}> {
  componentDidMount() {
    route(getPath(window.location.hash.substr(1)), true)
  }

  render() {
    return (
      <div className="c-nav">
        {items.map(({ path, name }) => (
          <Link href={path} className="c-nav__item" activeClassName="c-focused">
            {name}
          </Link>
        ))}
      </div>
    )
  }
}
