import { createStore, applyMiddleware } from "redux"
import reducer from "./reducers"

const middlewares = []

if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger")
  middlewares.push(logger)
}

export const Store = createStore(reducer, applyMiddleware(...middlewares))
