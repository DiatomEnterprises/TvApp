import { combineReducers } from "redux"

import utils from "./Utils"

const reducers = combineReducers({
  utils
})

export default (state: any, action: Redux.AnyAction) => reducers(state, action)
