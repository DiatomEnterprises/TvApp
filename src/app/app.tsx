import Preact from "#preact"
import * as classNames from "classnames"
import { getCurrentUrl } from "preact-router"
import { Provider, connect } from "preact-redux"

import { Store } from "#redux/store"
import { UtilsActions } from "#redux/actions"
import { BackButton, KeyboardMap, Navigation, Title } from "#components"
import { Routes } from "./routes"
import { _, Route } from "#utils"

import "./../styles/app.scss"

class AppComponent extends Preact.Component<MyRedux.Dispatch.Props & MyRedux.Reducers.Utils, {}> {
  componentDidMount() {
    const map = Route.routeToKeyboard(getCurrentUrl())
    if (map === "navigation") {
      this.props.dispatch(UtilsActions.focus(map))
    }
  }

  render() {
    const { focused, background } = this.props
    const showNav = focused === "navigation"

    return (
      <div className="c-container__wrapper center__both" style={_.background(background)}>
        <KeyboardMap />

        <div className={classNames("c-container", { "c-container--full": !showNav })}>
          <BackButton />

          <Title />
          <Navigation {...{ showNav }} />
          <Routes />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ utils }: MyRedux.State) => ({ focused: utils.focused, background: utils.background })

const AppWrapper = connect(mapStateToProps)(AppComponent as any)

export const App = () => {
  return (
    <Provider store={Store}>
      <AppWrapper />
    </Provider>
  )
}
