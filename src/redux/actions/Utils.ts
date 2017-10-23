export const UTILS_FOCUS_CHANGED = "UTILS_FOCUS_CHANGED"
export const UTILS_NAVIGATION_CHANGE = "UTILS_NAVIGATION_CHANGE"

const focus = (focused: KeyboardMap.MapKeys): MyRedux.Dispatch.Params<MyRedux.Reducers.Utils> => {
  return {
    type: UTILS_FOCUS_CHANGED,
    payload: { focused }
  }
}

export const UtilsActions = { focus }
