import Preact from "#preact"
import * as classNames from "classnames"
import { Provider, connect } from "preact-redux"

import { Store } from "#redux/store"
import { UtilsActions } from "#redux/actions"
import { BackButton, KeyboardMap, Navigation, Title } from "#components"
import { Routes } from "./routes"

import "./../styles/app.scss"

const matchRoute = (route: string): KeyboardMap.MapKeys => {
  switch (true) {
    case !!route.match(/collections\/\d/):
      return "collections"
    default:
      return "navigation"
  }
}

class AppComponent extends Preact.Component<MyRedux.Dispatch.Props & MyRedux.Reducers.Utils, {}> {
  componentDidMount() {
    const map = matchRoute(window.location.hash.slice(1))
    this.props.dispatch(UtilsActions.focus(map))
  }

  render() {
    const showNav = this.props.focused === "navigation"

    return (
      <div className="c-container__wrapper center__both">
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

const mapStateToProps = ({ utils }: MyRedux.State) => ({ focused: utils.focused })

const AppWrapper = connect(mapStateToProps)(AppComponent as any)

export const App = () => {
  return (
    <Provider store={Store}>
      <AppWrapper />
    </Provider>
  )
}
