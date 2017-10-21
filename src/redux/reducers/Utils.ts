import { UTILS_FOCUS_CHANGED } from "#redux/actions"

const initial: MyRedux.Reducers.Utils = {
  focused: "navigation"
}

export default (state = initial, action: Redux.AnyAction): MyRedux.Reducers.Utils => {
  switch (action.type) {
    case UTILS_FOCUS_CHANGED:
      return { ...state, focused: action.payload }

    default:
      return state
  }
}
