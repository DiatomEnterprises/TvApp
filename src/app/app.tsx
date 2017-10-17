import Preact from "#preact"
import { Provider } from "preact-redux"

import { Store } from "#redux/store"
import { Navigation } from "#components"
import { Routes } from "./routes"

export const App = () => {
  return (
    <Provider store={Store}>
      <div>
        <Navigation />
        <div>
          <Routes />
        </div>
      </div>
    </Provider>
  )
}
