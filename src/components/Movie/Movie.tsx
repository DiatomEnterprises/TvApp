import Preact from "#preact"

import "./Movie.scss"

export namespace Movie {
  export interface Props {
    id: number
    name: string
    rating: number
    date: string
    recent?: boolean
    popular?: boolean
  }
}

export class Movie extends Preact.Component<Movie.Props, {}> {
  render() {
    const { recent, popular, name } = this.props

    return (
      <div className="c-movie">
        <div className="c-movie__description">
          {recent && <div className="h4">New Release</div>}
          {popular && <div className="h4">Popular</div>}
          <div className="c-movie__name">{name}</div>
        </div>
      </div>
    )
  }
}
