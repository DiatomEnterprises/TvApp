import Preact from "#preact"
import { Provider } from "preact-redux"

import { Store } from "#redux/store"
import { Navigation } from "#components"

export const App = () => {
  return (
    <Provider store={Store}>
      <div>
        Hey
        <Navigation />
      </div>
    </Provider>
  )
}
