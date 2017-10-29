export const UTILS_FOCUS_CHANGED = "UTILS_FOCUS_CHANGED"
export const UTILS_BACK_CHANGED = "UTILS_BACK_CHANGED"

type UtilParams = MyRedux.Dispatch.Params<MyRedux.Reducers.Utils>

const focus = (focused: KeyboardMap.MapKeys): UtilParams => {
  return {
    type: UTILS_FOCUS_CHANGED,
    payload: { focused }
  }
}

const back = (path: string, map: KeyboardMap.MapKeys): UtilParams => {
  return {
    type: UTILS_BACK_CHANGED,
    payload: { back: { path, map } }
  }
}

export const UtilsActions = { focus, back }
