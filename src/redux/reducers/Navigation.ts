import { NAVIGATION_FOCUS_CHANGE } from "#redux/actions"

const initial: Reducers.Navigation = {
  focused: "Featured"
}

export default (state = initial, action: Redux.AnyAction) => {
  switch (action.type) {
    case NAVIGATION_FOCUS_CHANGE:
      return { ...state, upcoming: action.payload.results || [] }

    default:
      return state
  }
}
