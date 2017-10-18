import Preact from "#preact"
import Router from "preact-router"
import { createHashHistory } from "history"
import { Featured, Recent, CatchUp, Subscription, Collections, Browse } from "#pages"

export const Routes = () => (
  <div className="c-content">
    <Router history={createHashHistory()}>
      <Featured default path="/featured" />
      <Recent path="/recent" />
      <CatchUp path="/catch-up" />
      <Subscription path="/subscription" />
      <Collections path="/collections" />
      <Browse path="/browse" />
    </Router>
  </div>
)
