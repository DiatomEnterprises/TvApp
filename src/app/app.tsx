import Preact from "#preact"
import { Provider } from "preact-redux"

import { Store } from "#redux/store"
import { KeyboardMap, Navigation, Title } from "#components"
import { Routes } from "./routes"

import "./../styles/app.style.scss"

export const App = () => {
  return (
    <Provider store={Store}>
      <div className="c-container__wrapper center__both">
        <div className="c-container">
          <KeyboardMap />

          <Title />
          <Navigation />
          <Routes />
        </div>
      </div>
    </Provider>
  )
}
