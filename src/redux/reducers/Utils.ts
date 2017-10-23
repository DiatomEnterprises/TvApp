import { UTILS_FOCUS_CHANGED, UTILS_NAVIGATION_CHANGE } from "#redux/actions"

const initial: MyRedux.Reducers.Utils = {
  focused: undefined
}

export default (state = initial, action: Redux.AnyAction): MyRedux.Reducers.Utils => {
  switch (action.type) {
    case UTILS_FOCUS_CHANGED:
      return { ...state, ...action.payload }
    case UTILS_NAVIGATION_CHANGE:
      return { ...state, ...action.payload }

    default:
      return state
  }
}
