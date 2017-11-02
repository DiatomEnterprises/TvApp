import Preact from "#preact"
import { connect } from "preact-redux"
import { getCurrentUrl, route } from "preact-router"

import { getState } from "./data"
import { getCollection } from "./../Collections/data"
import { _, Route, Slider } from "#utils"
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
    bought: boolean
    base: string
  }
}

class MoviesComponent extends Preact.Component<MyRedux.Dispatch.Props, Movies.State> {
  componentDidMount() {
    const url = getCurrentUrl()
    const collection = getCollection(url)
    if (!collection) return

    const { id, name } = collection
    const match = url.match(/\/movies\/(\d+)/)
    const base = match && match[0]
    const { dispatch } = this.props

    dispatch(TitleActions.change(name, "Collections"))
    dispatch(UtilsActions.focus(Route.routeToKeyboard(url)))
    dispatch(UtilsActions.back(`${base}/back`, "back.movies"))

    const state = getState(id) as Movies.State
    const currentBatch = this.currentBatch(url, state.batches)
    this.setState({ ...state, currentBatch, name, base, bought: false } as Movies.State)
  }

  currentBatch(path: string, batches = this.state.batches) {
    const match = path.match(/movie\/(\d+)/)
    if (!match) return 0
    const index = parseInt(match[1], 10)
    return _.findInBatches(index, batches)
  }

  onClick = (next: string) => {
    this.setState({ currentBatch: this.currentBatch(next) })
  }

  onBuy = (next: string, prev: string) => {
    const regex = /\/buy/
    if (prev.match(regex)) {
      const url = prev.replace(regex, "/movie/1")
      route(url)
      this.setState({ bought: true })
      this.props.dispatch(UtilsActions.focus(Route.routeToKeyboard(url)))
    }
  }

  renderBuyLink() {
    if (this.state.bought) return

    const props: Link.Props = {
      map: "movies/nav",
      path: `${this.state.base}/buy`,
      className: "c-button float__left",
      onClick: this.onBuy
    }
    return <Link {...props}>Buy All XXX</Link>
  }

  renderSortLink() {
    const props: Link.Props = {
      map: "movies/nav",
      path: `${this.state.base}/sort`,
      className: "c-button float__right"
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
