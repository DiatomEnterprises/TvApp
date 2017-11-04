import Preact from "#preact"

import { Link } from "#components"

export namespace NavButton {
  export interface State {}
  export interface Props {
    path: string
    map: KeyboardMap.MapKeys
    name: string
  }
}

export class NavButton extends Preact.Component<NavButton.Props, NavButton.State> {
  render() {
    const { path, map, name } = this.props
    const props = { path, map, className: "c-button" }
    return <Link {...props}>{name}</Link>
  }
}
