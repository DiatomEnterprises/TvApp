import Preact from "#preact"
import { route, getCurrentUrl } from "preact-router"
import { connect } from "preact-redux"
import * as classNames from "classnames"

import { Link } from "#components"
import { UtilsActions } from "#redux/actions"
import { data, Item } from "./data"
import "./Dropdown.scss"

export namespace Dropdown {
  export interface State {
    open: boolean
  }
  export interface Props extends MyRedux.Reducers.Utils, MyRedux.Dispatch.Props {
    base: string
    map: KeyboardMap.MapKeys
  }
}

const allRoutes = data.map(({ route }) => route).join("|")

class DropdownComponent extends Preact.Component<Dropdown.Props, Dropdown.State> {
  constructor() {
    super()
    this.state = { open: false }
  }

  componentDidMount() {
    if (this.props.focused === "movies/dropdown") {
      const url = getCurrentUrl()
      this.setState({ open: true })
      this.updateSort(url, url)
    }
  }

  componentWillReceiveProps(next: Dropdown.Props) {
    if (next.focused !== this.props.focused) {
      const open = next.focused === "movies/dropdown"
      this.setState({ open })
      if (next.sort && open) {
        route(this.buildRoute(next.sort.by))
      }
    }
  }

  onClick = (next: string, prev: string) => {
    this.updateSort(next, prev)
  }

  updateSort(next: string, prev: string) {
    const regex = new RegExp(`/(${allRoutes})`)
    const match = prev.match(regex)
    if (next === prev && match) {
      const route = match[1]
      const item = data.find(item => item.route === route)
      if (item) {
        this.props.dispatch(UtilsActions.dropdown(item.route, item.name))
      }
    }
  }

  buildRoute(route: MyRedux.SortBy) {
    return `${this.props.base}/${route}`
  }

  getProps({ name, route }: Item) {
    return {
      map: this.props.map,
      path: this.buildRoute(route),
      className: "c-dropdown__item t-tx--center",
      onClick: this.onClick
    } as Link.Props
  }

  render() {
    if (!this.state.open) return null

    return <div className="c-dropdown">{data.map(item => <Link {...this.getProps(item)}>{item.name}</Link>)}</div>
  }
}

const mapStateToProps = ({ utils }: MyRedux.State) => ({ focused: utils.focused, sort: utils.sort })
export const Dropdown = connect(mapStateToProps)(DropdownComponent as any)
