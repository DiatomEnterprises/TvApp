export const TITLE_CHANGE = "TITLE_CHANGE"

const change = (header: string, description: string): MyRedux.Dispatch.Params<MyRedux.Reducers.Title> => {
  return {
    type: TITLE_CHANGE,
    payload: { header, description }
  }
}

export const TitleActions = { change }
