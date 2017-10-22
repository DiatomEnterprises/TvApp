export const UTILS_FOCUS_CHANGED = "UTILS_FOCUS_CHANGED"
export const UTILS_NAVIGATION_CHANGE = "UTILS_NAVIGATION_CHANGE"

const focus = (focused: KeyboardMap.MapKeys): MyRedux.Dispatch.Params<MyRedux.Reducers.Utils> => {
  return {
    type: UTILS_FOCUS_CHANGED,
    payload: { focused }
  }
}

const navigation = (navigationShow: boolean): MyRedux.Dispatch.Params<MyRedux.Reducers.Utils> => {
  return {
    type: UTILS_NAVIGATION_CHANGE,
    payload: { navigationShow }
  }
}

export const UtilsActions = { focus, navigation }
