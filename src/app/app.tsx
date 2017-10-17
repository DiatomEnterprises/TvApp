import Preact from "#preact"
import { Provider } from "preact-redux"

import { Store } from "#redux/store"
import { KeyboardMap, Navigation } from "#components"
import { Routes } from "./routes"

export const App = () => {
  return (
    <Provider store={Store}>
      <KeyboardMap>
        <Navigation />
        <div>
          <Routes />
        </div>
      </KeyboardMap>
    </Provider>
  )
}
