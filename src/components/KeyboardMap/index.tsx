import Preact from "#preact"
import { connect } from "preact-redux"
import { Execute } from "./Mapping"

const keys = {
  37: "left",
  38: "up",
  39: "right",
  40: "down"
}

class KeyboardMapComponent extends Preact.Component<Reducers.Utils, {}> {
  constructor(props: Reducers.Utils) {
    super(props)

    this.onKeyUp = this.onKeyUp.bind(this)
  }

  componentDidMount() {
    window.addEventListener("keyup", this.onKeyUp)
  }

  onKeyUp(event: KeyboardEvent) {
    const key = keys[event.keyCode]
    if (key) {
      Execute(this.props.focused, key)
    }
  }

  render() {
    return null
  }
}

const mapStateToProps = ({ utils }: { utils: Reducers.Utils }) => ({
  focused: utils.focused
})

export const KeyboardMap = connect(mapStateToProps)(KeyboardMapComponent as any)
