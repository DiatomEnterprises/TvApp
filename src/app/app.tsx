import Preact from "#preact"
import { Provider } from "preact-redux"

import { Store } from "#redux/store"
import { KeyboardMap, Navigation } from "#components"
import { Routes } from "./routes"

import "./app.scss"

export const App = () => {
  return (
    <Provider store={Store}>
      <div className="c-container">
        <KeyboardMap />

        <Navigation />
        <Routes />
      </div>
    </Provider>
  )
}
