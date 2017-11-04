import { UTILS_FOCUS_CHANGED, UTILS_BACK_CHANGED, UTILS_SORT_CHANGED, UTILS_BACKGROUND_CHANGED } from "#redux/actions"

const initial: MyRedux.Reducers.Utils = {
  back: undefined,
  focused: undefined,
  background: undefined,
  sort: {
    by: "date",
    name: "Release Date"
  }
}

export default (state = initial, action: Redux.AnyAction): MyRedux.Reducers.Utils => {
  switch (action.type) {
    case UTILS_BACK_CHANGED:
      return { ...state, ...action.payload }
    case UTILS_FOCUS_CHANGED:
      return { ...state, ...action.payload }
    case UTILS_SORT_CHANGED:
      return { ...state, ...action.payload }
    case UTILS_BACKGROUND_CHANGED:
      return { ...state, ...action.payload }

    default:
      return state
  }
}
