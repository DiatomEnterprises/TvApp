import Preact from "#preact"
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
    collection: Collection
    batches: Movie.Props[][]
    titles: number
    name: string
    currentBatch: number
  }
}

const constants = {} as any
const initConstants = () => {
  constants.hash = window.location.hash.slice(1)
  const match = constants.hash.match(/\/movies\/(\d+)/)
  constants.base = match && match[0]
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
  constructor() {
    super()
    initConstants()

    const collection = getCollection(constants.base)
    if (collection) {
      const state = getState(collection.id) as Movies.State
      this.state = { ...state, name: collection.name, currentBatch: 0 }
    }
  }

  componentDidMount() {
    initConstants()

    const { dispatch } = this.props
    this.onClick(constants.hash)
    dispatch(TitleActions.change(this.state.name, "Collections"))
    dispatch(UtilsActions.focus(Route.routeToKeyboard(constants.hash)))
    dispatch(UtilsActions.back(`${constants.base}/back`, "back.movies"))
  }

  onClick = (next: string) => {
    const match = next.match(/movie\/(\d+)/)
    if (match) {
      const index = parseInt(match[1], 10)
      this.setState({ currentBatch: findInBatches(index, this.state.batches) })
    }
  }

  renderBuyLink() {
    const props: Link.Props = {
      map: "movies/nav",
      path: `${constants.base}/buy`,
      className: "c-button float__left",
      activeClassName: "c-focused"
    }
    return <Link {...props}>Buy All XXX</Link>
  }

  renderSortLink() {
    const props: Link.Props = {
      map: "movies/nav",
      path: `${constants.base}/sort`,
      className: "c-button float__right",
      activeClassName: "c-focused"
    }
    return <Link {...props}>Sort</Link>
  }

  renderBatch(movies: Movie.Props[], index: number) {
    const style = Slider.movies(index, this.state.currentBatch)
    return (
      <div style={style} className="c-movie__line">
        {movies.map(movie => <Movie {...movie} onClick={this.onClick} path={constants.base} />)}
      </div>
    )
  }

  render() {
    const { collection, batches, titles } = this.state

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
