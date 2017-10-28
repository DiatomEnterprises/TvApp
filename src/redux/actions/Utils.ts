export const UTILS_FOCUS_CHANGED = "UTILS_FOCUS_CHANGED"
export const UTILS_BACK_CHANGED = "UTILS_BACK_CHANGED"

type UtilParams = MyRedux.Dispatch.Params<MyRedux.Reducers.Utils>

const focus = (focused: KeyboardMap.MapKeys): UtilParams => {
  return {
    type: UTILS_FOCUS_CHANGED,
    payload: { focused }
  }
}

const back = (back: string | undefined): UtilParams => {
  return {
    type: UTILS_BACK_CHANGED,
    payload: { back }
  }
}

export const UtilsActions = { focus, back }
