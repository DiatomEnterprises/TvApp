import Preact from "#preact"
import { connect } from "preact-redux"
import { route, getCurrentUrl } from "preact-router"
import * as classNames from "classnames"

import collections from "./data"
import { Link, Icon } from "#components"
import { Route, Slider, _, C } from "#utils"
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
    image: string
  }
}

class CollectionsComponent extends Preact.Component<Collections.Props, Collections.State> {
  constructor() {
    super()
    const [, parsed] = getCurrentUrl().split("/collections/")
    const id = parseInt(parsed, 10)
    const index = collections.findIndex(item => item.id === id)
    this.state = { current: index === -1 ? null : index }
  }

  componentDidMount() {
    const { dispatch } = this.props
    const map = Route.routeToKeyboard(getCurrentUrl())

    dispatch(TitleActions.change("Catalogue", ""))
    dispatch(UtilsActions.focus(map))
    dispatch(UtilsActions.back("/collections/back", "back.collections"))
    dispatch(UtilsActions.background(C.DEFAULT_BACKGROUND))
  }

  onReset = () => {
    this.setState({ current: null })
  }

  onClick(index: number, path: string) {
    if (index === this.state.current) {
      route(`/movies/${collections[index].id}/buy`, true)
    } else {
      this.setState({ current: index })
    }
  }

  renderItem = (item: Collections.Item, index: number) => {
    const props: Link.Props = {
      map: "collections",
      path: `/collections/${item.id}`,
      className: "c-collections__item",
      onReset: this.onReset,
      onClick: this.onClick.bind(this, index)
    }

    return (
      <Link {...props}>
        <div className="c-item__content" style={_.background(item.image)}>
          <div className="float__right c-item__length">
            <Icon image="movies" tag="span" />
            {item.length}
          </div>

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
    const style = Slider.collections(this.state.current || 0)

    return (
      <div className="c-collections">
        <div style={style} className="c-collections__content">
          {collections.map(this.renderItem)}
        </div>
      </div>
    )
  }
}

export const Collections = connect()(CollectionsComponent as any)
