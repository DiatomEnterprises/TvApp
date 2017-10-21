export const UTILS_FOCUS_CHANGED = "UTILS_FOCUS_CHANGED"

const focus = (focused: KeyboardMap.MapKeys): MyRedux.Dispatch.Params<MyRedux.Reducers.Utils> => {
  return {
    type: UTILS_FOCUS_CHANGED,
    payload: { focused }
  }
}

export const UtilsActions = { focus }
