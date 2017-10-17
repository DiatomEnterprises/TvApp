import Preact from "#preact"
import { Link } from "preact-router/match"

const items = [
  { name: "Featured", path: "/featured" },
  { name: "Recently Added", path: "/recent" },
  { name: "Best of Catch-Up", path: "/catch-up" },
  { name: "Subscription", path: "/subscription" },
  { name: "Collections", path: "/collections" },
  { name: "Browse", path: "/browse" }
]

export const Navigation = () => {
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
