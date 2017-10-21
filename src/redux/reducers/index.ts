import { combineReducers } from "redux"

import utils from "./Utils"
import title from "./Title"

const reducers = combineReducers({
  title,
  utils
})

export default (state: MyRedux.State, action: Redux.AnyAction) => reducers(state, action)
