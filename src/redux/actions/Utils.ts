export const UTILS_FOCUS_CHANGED = "UTILS_FOCUS_CHANGED"
export const UTILS_BACK_CHANGED = "UTILS_BACK_CHANGED"
export const UTILS_SORT_CHANGED = "UTILS_SORT_CHANGED"
export const UTILS_BACKGROUND_CHANGED = "UTILS_BACKGROUND_CHANGED"

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

const dropdown = (by: MyRedux.SortBy, name: string): UtilParams => {
  return {
    type: UTILS_SORT_CHANGED,
    payload: { sort: { by, name } }
  }
}

const background = (image: string): UtilParams => {
  return {
    type: UTILS_BACKGROUND_CHANGED,
    payload: { background: image }
  }
}

export const UtilsActions = { focus, back, dropdown, background }
