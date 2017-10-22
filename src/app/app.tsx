import Preact from "#preact"
import * as classNames from "classnames"
import { Provider, connect } from "preact-redux"

import { Store } from "#redux/store"
import { BackButton, KeyboardMap, Navigation, Title } from "#components"
import { Routes } from "./routes"

import "./../styles/app.scss"

class AppComponent extends Preact.Component<MyRedux.Reducers.Utils, {}> {
  render() {
    const { navigationShow } = this.props

    return (
      <div className="c-container__wrapper center__both">
        <KeyboardMap />

        <div className={classNames("c-container", { "c-container--full": !navigationShow })}>
          <BackButton />

          <Title />
          {navigationShow && <Navigation />}
          <Routes />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ utils }: MyRedux.State) => ({ navigationShow: utils.navigationShow })

const AppWrapper = connect(mapStateToProps)(AppComponent as any)

export const App = () => {
  return (
    <Provider store={Store}>
      <AppWrapper />
    </Provider>
  )
}
