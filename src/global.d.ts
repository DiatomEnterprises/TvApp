declare namespace KeyboardMap {
  export type Url = "url/back"
  export type Links = "navigation@4" | "movies/view@0" | "movies/view@4" | "movies/nav@0" | "movies/nav@1"
  export type Actions = ":prev" | ":prev:parent" | ":next" | ":next:parent" | ":current" | ":complex"
  export type MapKeys = keyof Map

  type StringFunc = () => string
  type ControlValue = Actions | MapKeys | Links | Url
  type ExtraControlValue = ControlValue | StringFunc

  export interface Map {
    navigation: Controls
    collections: Controls
    "movies/view": Controls
    "movies/nav": Controls
    "movies/dropdown": Controls
    "back.collections": Controls
    "back.movies": Controls
  }
  export interface Controls {
    selector: string
    up?: ExtraControlValue
    down?: ExtraControlValue
    left?: ExtraControlValue
    right?: ExtraControlValue
    enter?: ExtraControlValue

    upFirst?: ControlValue
    downLast?: ControlValue
    leftFirst?: ControlValue
    rightLast?: ControlValue
  }
}

declare namespace MyRedux {
  export type SortBy = "name" | "rating" | "date"
  export namespace Dispatch {
    export interface Props {
      dispatch: (data: DispatchParams) => void
    }

    export interface Params<T> {
      type: string
      payload?: T
    }
  }

  export interface State extends Redux.ReducersMapObject {
    title: Reducers.Title
    utils: Reducers.Utils
  }

  export namespace Reducers {
    export interface Title {
      header: string
      description: string
    }
    export interface Utils {
      back?: {
        map: KeyboardMap.MapKeys
        path: string
      }
      sort?: {
        by: SortBy
        name: string
      }
      background?: string
      focused?: keyof KeyboardMap.Map
    }
  }
}

declare namespace Router {
  export interface Props {
    path: string
    default?: boolean
  }
  export type Route = (props: Router.Props) => JSX.Element
}
