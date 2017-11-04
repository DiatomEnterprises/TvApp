import Preact from "#preact"

import { Link } from "#components"
import { _ } from "#utils"
import "./Movie.scss"

export namespace Movie {
  export interface Props {
    id: number
    name: string
    rating: number
    date: number
    path: string
    image: string
    recent?: boolean
    popular?: boolean
    onClick?: Function
  }
}

export class Movie extends Preact.Component<Movie.Props, {}> {
  render() {
    const { id, recent, popular, name, image, path, onClick } = this.props
    const props: Link.Props = {
      onClick,
      style: _.background(image),
      map: "movies/view",
      path: `${path}/movie/${id}`,
      className: "c-movie"
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
