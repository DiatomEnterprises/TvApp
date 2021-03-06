import Preact from "#preact"
import Router, { route } from "preact-router"
import createHashHistory from "history/createHashHistory"
import { Featured, Recent, CatchUp, Subscription, Collections, Movies, Browse } from "#pages"

const history = createHashHistory()
history.listen((location, action) => action === "POP" && route(location.pathname, true))

export const Routes = () => (
  <div className="c-content">
    <Router history={history}>
      <Featured default path="/featured" />
      <Recent path="/recent" />
      <CatchUp path="/catch-up" />
      <Subscription path="/subscription" />
      <Collections path="/collections/:id?" />
      <Movies path="/movies/:collectionId/:action/:id?" />
      <Browse path="/browse" />
    </Router>
  </div>
)
