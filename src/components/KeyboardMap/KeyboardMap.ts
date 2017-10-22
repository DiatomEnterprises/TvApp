import Preact from "#preact"
import { connect } from "preact-redux"
import { Execute } from "./Mapping"

const keys = {
  37: "left",
  38: "up",
  39: "right",
  40: "down",

  13: "enter",
  32: "enter" // space
}

class KeyboardMapComponent extends Preact.Component<MyRedux.Reducers.Utils, {}> {
  componentDidMount() {
    window.addEventListener("keyup", this.onKeyUp)
  }

  onKeyUp = (event: KeyboardEvent) => {
    const key = keys[event.keyCode]
    if (key && this.props.focused) {
      Execute(this.props.focused, key)
    }
  }

  render() {
    return null
  }
}

const mapStateToProps = ({ utils }: MyRedux.State) => ({ focused: utils.focused })

export const KeyboardMap = connect(mapStateToProps)(KeyboardMapComponent as any)
