import Preact from "#preact"
import Router, { route } from "preact-router"
import { createHashHistory } from "history"
import { Featured, Recent, CatchUp, Subscription, Collections, Browse } from "#pages"

const history = createHashHistory()
history.listen((location, action) => action === "POP" && route(location.pathname, true))

export const Routes = () => (
  <div className="c-content">
    <Router history={history}>
      <Featured default path="/featured" />
      <Recent path="/recent" />
      <CatchUp path="/catch-up" />
      <Subscription path="/subscription" />
      <Collections path="/collections" />
      <Browse path="/browse" />
    </Router>
  </div>
)
