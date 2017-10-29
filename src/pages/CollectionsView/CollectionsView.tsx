import Preact from "#preact"
import { connect } from "preact-redux"
import * as classNames from "classnames"

import data from "./data"
import collections from "./../Collections/data"
import { Route } from "#utils"
import { Movie } from "#components"
import { TitleActions, UtilsActions } from "#redux/actions"

import "./CollectionsView.scss"

const MOVIES_PER_LINE = 5

namespace CollectionsView {
  export interface Collection {
    id: number
    description: string
  }

  export interface State {
    collection: Collection | undefined
    batches: Movie.Props[][]
    titles: number
  }
}

class CollectionsViewComponent extends Preact.Component<MyRedux.Dispatch.Props, CollectionsView.State> {
  constructor() {
    super()
    this.state = { collection: undefined, batches: [], titles: 0 }
  }

  componentDidMount() {
    const match = window.location.hash.match(/\/collections\/(\d+)\/(view|back)/)
    const collection = this.getCollection(match)
    if (!collection) return

    this.setDispatches(collection.name)
    this.initState(collection.id)
  }

  getCollection(match: RegExpMatchArray | null) {
    if (!match) return
    const id = parseInt(match[1], 10)
    return collections.find(item => item.id === id)
  }

  setDispatches(name: string) {
    const { dispatch } = this.props
    const hash = window.location.hash
    const map = Route.routeToKeyboard(hash.slice(1))
    const path = hash.slice(1).replace("view", "back")

    dispatch(TitleActions.change(name, "Collections"))
    dispatch(UtilsActions.focus(map))
    dispatch(UtilsActions.back(path, "back.collections/view"))
  }

  initState(id: number) {
    const item = data.find(item => item.id === id)
    if (item) {
      const batches = []
      const { movies, ...collection } = item
      const titles = movies.length
      while (movies.length) {
        batches.push(movies.splice(0, MOVIES_PER_LINE))
      }
      this.setState({ collection, batches, titles })
    }
  }

  render() {
    const { collection, batches, titles } = this.state
    if (!collection) return null

    return (
      <div className="c-collection">
        <div className="c-collection__titles">{titles} Titles</div>
        <div className="c-collection__description">{collection.description}</div>

        <div className="c-collection__nav">
          <div className="c-button float__left">Buy All XXX</div>
          <div className="c-button float__right">Sort</div>
        </div>

        <div className="c-collection__movies">
          {batches.map(movies => <div className="c-movie__line">{movies.map(movie => <Movie {...movie} />)}</div>)}
        </div>
      </div>
    )
  }
}

export const CollectionsView = connect()(CollectionsViewComponent as any)
