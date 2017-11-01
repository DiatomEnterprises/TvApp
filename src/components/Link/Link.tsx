import Preact from "#preact"
import { connect } from "preact-redux"
import * as classNames from "classnames"
import { Match } from "preact-router/match"
import { route, getCurrentUrl } from "preact-router"

import { UtilsActions } from "#redux/actions"

export namespace Link {
  export interface Props {
    path: string
    className: string
    activeClassName: string
    map: KeyboardMap.MapKeys
    children?: JSX.Element[]
    onClick?: Function
    onReset?: Function
    style?: any
  }
  export interface WithRedux extends Props, MyRedux.Dispatch.Props, MyRedux.Reducers.Utils {}
}

class LinkComponent extends Preact.Component<Link.WithRedux, {}> {
  componentWillReceiveProps(next: Link.WithRedux) {
    const { focused, onReset, map } = this.props
    if (next.focused !== map && next.focused !== focused) {
      onReset && onReset()
    }
  }

  onClick = (event: MouseEvent) => {
    const { path, onClick, map, dispatch, focused } = this.props
    const hash = getCurrentUrl()

    if (hash !== path) {
      route(path, true)
    }
    if (focused !== map) {
      dispatch(UtilsActions.focus(map))
    }

    onClick && onClick(path, hash)
    event.preventDefault()
  }

  render() {
    const { className, activeClassName, path, children, style } = this.props
    return (
      <Match path={path}>
        {({ matches }: { matches: boolean }) => (
          <div style={style} onClick={this.onClick} className={classNames(className, { [activeClassName]: matches })}>
            {children}
          </div>
        )}
      </Match>
    )
  }
}

const mapStateToProps = ({ utils }: MyRedux.State) => ({ focused: utils.focused })

export const Link = connect(mapStateToProps)(LinkComponent as any)
