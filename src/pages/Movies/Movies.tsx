import Preact from "#preact"
import { getCurrentUrl } from "preact-router"
import { connect } from "preact-redux"

import { getState } from "./data"
import { getCollection } from "./../Collections/data"
import { Route, Slider } from "#utils"
import { Movie, Link } from "#components"
import { TitleActions, UtilsActions } from "#redux/actions"

import "./Movies.scss"

namespace Movies {
  export interface Collection {
    id: number
    description: string
  }

  export interface State {
    collection?: Collection
    batches: Movie.Props[][]
    titles: number
    name: string
    currentBatch: number
    base: string
  }
}

const findInBatches = (id: number, batches: Movie.Props[][]): number => {
  for (const batchIndex in batches) {
    for (const movieIndex in batches[batchIndex]) {
      if (batches[batchIndex][movieIndex].id === id) {
        return parseInt(batchIndex, 10)
      }
    }
  }
  return 0
}

class MoviesComponent extends Preact.Component<MyRedux.Dispatch.Props, Movies.State> {
  componentDidMount() {
    const { dispatch } = this.props
    const url = getCurrentUrl()
    const collection = getCollection(url)

    console.warn(url, collection)
    if (collection) {
      const match = url.match(/\/movies\/(\d+)/)
      const base = match && match[0]

      dispatch(TitleActions.change(collection.name, "Collections"))
      dispatch(UtilsActions.focus(Route.routeToKeyboard(url)))
      dispatch(UtilsActions.back(`${base}/back`, "back.movies"))

      const state = getState(collection.id) as Movies.State
      this.setState({ ...state, name: collection.name, currentBatch: this.currentBatch(url), base } as Movies.State)
    }
  }

  currentBatch(path: string) {
    const match = path.match(/movie\/(\d+)/)
    if (match) {
      const index = parseInt(match[1], 10)
      return findInBatches(index, this.state.batches)
    }
    return 0
  }

  onClick = (next: string) => {
    this.setState({ currentBatch: this.currentBatch(next) })
  }

  renderBuyLink() {
    const props: Link.Props = {
      map: "movies/nav",
      path: `${this.state.base}/buy`,
      className: "c-button float__left",
      activeClassName: "c-focused"
    }
    return <Link {...props}>Buy All XXX</Link>
  }

  renderSortLink() {
    const props: Link.Props = {
      map: "movies/nav",
      path: `${this.state.base}/sort`,
      className: "c-button float__right",
      activeClassName: "c-focused"
    }
    return <Link {...props}>Sort</Link>
  }

  renderBatch(movies: Movie.Props[], index: number) {
    const { currentBatch, base } = this.state
    const style = Slider.movies(index, currentBatch)
    return (
      <div style={style} className="c-movie__line">
        {movies.map(movie => <Movie {...movie} onClick={this.onClick} path={base} />)}
      </div>
    )
  }

  render() {
    const { collection, batches, titles } = this.state
    if (!collection) return null

    return (
      <div className="c-collection">
        <div className="c-collection__titles">{titles} Titles</div>
        <div className="c-collection__description">{collection.description}</div>

        <div className="c-collection__nav">
          {this.renderBuyLink()}
          {this.renderSortLink()}
        </div>

        <div className="c-collection__movies">{batches.map((movies, index) => this.renderBatch(movies, index))}</div>
      </div>
    )
  }
}

export const Movies = connect()(MoviesComponent as any)
