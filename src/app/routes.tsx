import Preact from "#preact"
import Router from "preact-router"
import { createHashHistory } from "history"
import { Featured, Recent, CatchUp, Subscription, Collections, Browse } from "#pages"

export const Routes = () => (
  <Router history={createHashHistory()}>
    <Featured path="/featured" />
    <Recent path="/recent" />
    <CatchUp path="/catch-up" />
    <Subscription path="/subscription" />
    <Collections path="/collections" />
    <Browse path="/browse" />
  </Router>
)
