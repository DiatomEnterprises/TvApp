import Preact from "#preact"
import { connect } from "preact-redux"
import { getCurrentUrl, route } from "preact-router"

import { getState, batchMovies } from "./data"
import { getCollection } from "./../Collections/data"
import { _, Route, Slider } from "#utils"
import { Movie, Link, BuyButton, SortButton, Dropdown, Icon } from "#components"
import { TitleActions, UtilsActions } from "#redux/actions"

import "./Movies.scss"

namespace Movies {
  export interface Collection {
    id: number
    description: string
  }

  export interface State {
    collection?: Collection
    movies: Movie.Props[]
    batches: Movie.Props[][]
    titles: number
    name: string
    currentBatch: number
    base: string
  }

  export interface Props extends MyRedux.Dispatch.Props, MyRedux.Reducers.Utils {}
}

class MoviesComponent extends Preact.Component<Movies.Props, Movies.State> {
  componentDidMount() {
    const url = getCurrentUrl()
    const collection = getCollection(url)
    if (!collection) return

    const { id, name } = collection
    const match = url.match(/\/movies\/(\d+)/)
    const base = match && match[0]
    const { dispatch } = this.props

    dispatch(TitleActions.change(name, "Collections"))
    dispatch(UtilsActions.background(collection.image))
    dispatch(UtilsActions.focus(Route.routeToKeyboard(url)))
    dispatch(UtilsActions.back(`${base}/back`, "back.movies"))

    const state = getState(id, this.sortFunc()) as Movies.State
    const currentBatch = this.currentBatch(url, state.batches)
    this.setState({ ...state, currentBatch, name, base } as Movies.State)
  }

  componentWillReceiveProps(next: Movies.Props) {
    if (next.sort && next.sort !== this.props.sort) {
      const sortBy = this.sortFunc(next)
      const batches = batchMovies(this.state.movies.sort(sortBy))
      this.setState({ batches })
    }
  }

  sortFunc(props = this.props) {
    return _.sortBy[props.sort ? props.sort.by : "date"]
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

  renderBatch = (movies: Movie.Props[]) => {
    return (
      <div className="c-movie__line">
        {movies.map(movie => <Movie {...movie} onClick={this.onClick} path={this.state.base} />)}
      </div>
    )
  }

  render() {
    const { collection, batches, titles, base, currentBatch } = this.state
    if (!collection) return null
    const button = { map: "movies/nav", base }
    const dropdown = { map: "movies/dropdown", base }
    const style = Slider.movies(currentBatch)

    return (
      <div className="c-collection">
        <Icon className="c-collection__titles" image="titles">
          {titles} Titles
        </Icon>
        <div className="c-collection__description">{collection.description}</div>

        <div className="c-collection__nav">
          <BuyButton {...button} />
          <SortButton {...button} />
          <Dropdown {...dropdown} />
        </div>

        <div className="c-collection__movies">
          <div style={style} className="c-movie__wrapper">
            {batches.map(this.renderBatch)}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ utils }: MyRedux.State) => ({ sort: utils.sort })
export const Movies = connect(mapStateToProps)(MoviesComponent as any)
