import Preact from "#preact"

import { Link } from "#components"
import "./Movie.scss"

export namespace Movie {
  export interface Props {
    id: number
    name: string
    rating: number
    date: string
    path: string
    recent?: boolean
    popular?: boolean
  }
}

export class Movie extends Preact.Component<Movie.Props, {}> {
  render() {
    const { id, recent, popular, name, path } = this.props
    const props: Link.Props = {
      map: "movies/view",
      path: `${path}/movie/${id}`,
      className: "c-movie",
      activeClassName: "c-focused"
    }

    return (
      <Link {...props}>
        <div className="c-movie__description">
          {recent && <div className="h4">New Release</div>}
          {popular && <div className="h4">Popular</div>}
          <div className="c-movie__name">{name}</div>
        </div>
      </Link>
    )
  }
}
