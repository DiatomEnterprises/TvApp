import { combineReducers } from "redux"

import navigation from "./Navigation"

const reducers = combineReducers({
  navigation
})

export default (state: any, action: Redux.AnyAction) => reducers(state, action)
