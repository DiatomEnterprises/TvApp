import { TITLE_CHANGE } from "#redux/actions"

const initial: MyRedux.Reducers.Title = {
  header: "",
  description: ""
}

export default (state = initial, action: Redux.AnyAction): MyRedux.Reducers.Title => {
  switch (action.type) {
    case TITLE_CHANGE:
      return { ...state, ...action.payload }

    default:
      return state
  }
}
