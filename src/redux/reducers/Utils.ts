import { UTILS_FOCUS_CHANGED } from "#redux/actions"

const initial: Reducers.Utils = {
  focused: "navigation"
}

export default (state = initial, action: Redux.AnyAction) => {
  switch (action.type) {
    case UTILS_FOCUS_CHANGED:
      return { ...state, focused: action.payload }

    default:
      return state
  }
}
