import Preact from "#preact"
import { connect } from "preact-redux"
import { route } from "preact-router"
import * as classNames from "classnames"

import collections from "./data"
import { Link } from "#components"
import { Route } from "#utils"
import { TitleActions, UtilsActions } from "#redux/actions"

import "./Collections.scss"

namespace Collections {
  export interface Props extends MyRedux.Dispatch.Props {}
  export interface State {
    current: null | number
  }
  export interface Item {
    id: number
    name: string
    length: number
  }
}

const sliderStyle = (index: number, current: number, direction: "X" | "Y" = "X", size: number = 500) => {
  const modifier = current > 0 ? current - 1 : current
  if (index < modifier && current > 1) {
    return { opacity: 0 }
  } else {
    return { transform: `translate${direction}(${(index - modifier) * size}px)` }
  }
}

class CollectionsComponent extends Preact.Component<Collections.Props, Collections.State> {
  constructor() {
    super()
    const [, parsed] = window.location.hash.split("#/collections/")
    const id = parseInt(parsed, 10)
    const index = collections.findIndex(item => item.id === id)
    this.state = { current: index === -1 ? null : index }
  }

  componentDidMount() {
    const { dispatch } = this.props
    const map = Route.routeToKeyboard(window.location.hash.slice(1))

    dispatch(TitleActions.change("Catalogue", ""))
    dispatch(UtilsActions.focus(map))
    dispatch(UtilsActions.back("/collections/back", "back.collections"))
  }

  onReset = () => {
    this.setState({ current: null })
  }

  onClick(index: number, path: string) {
    if (index === this.state.current) {
      route(`/movies/${collections[index].id}/buy`)
    } else {
      this.setState({ current: index })
    }
  }

  renderItem = (item: Collections.Item, index: number) => {
    const style = sliderStyle(index, this.state.current || 0)
    const props: Link.Props = {
      style,
      map: "collections",
      path: `/collections/${item.id}`,
      className: "c-collections__item",
      activeClassName: "c-focused",
      onReset: this.onReset,
      onClick: this.onClick.bind(this, index)
    }

    return (
      <Link {...props}>
        <div className="c-item__content">
          <div className="float__right c-item__length">{item.length}</div>

          <div className="t-tx--center center__both">
            <div className="h4">Collection</div>
            <div className="h3">{item.name}</div>
          </div>
        </div>

        <div className="c-card" />
        <div className="c-card" />
      </Link>
    )
  }

  render() {
    return <div className="c-collections">{collections.map(this.renderItem)}</div>
  }
}

export const Collections = connect()(CollectionsComponent as any)
