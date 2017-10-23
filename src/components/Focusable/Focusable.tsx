import Preact from "#preact"
import { connect } from "preact-redux"

import { UtilsActions } from "#redux/actions"

namespace Focusable {
  type ReduxProps = JSX.HTMLAttributes & MyRedux.Dispatch.Props & MyRedux.Reducers.Utils
  export interface Props extends ReduxProps {
    map: KeyboardMap.MapKeys
    children?: JSX.Element[]
    onClick?: JSX.EventHandler<any>
    onReset?: Function
  }
}

class FocusableComponent extends Preact.Component<Focusable.Props, {}> {
  componentWillReceiveProps(nextProps: Focusable.Props) {
    const { focused, onReset, map } = this.props
    if (nextProps.focused !== map && nextProps.focused !== focused) {
      onReset && onReset()
    }
  }

  onClick = () => {
    const { dispatch, focused, map, onClick } = this.props
    onClick && onClick(null)

    if (focused !== map) {
      dispatch(UtilsActions.focus(map))
    }
  }

  render() {
    const { children, className, style } = this.props
    return (
      <div className={className} onClick={this.onClick} style={style}>
        {children}
      </div>
    )
  }
}

const mapStateToProps = ({ utils }: MyRedux.State) => ({ focused: utils.focused })

export const Focusable = connect(mapStateToProps)(FocusableComponent as any)
