declare namespace KeyboardMap {
  export type Url = "url/back"
  export type Links = "navigation@4" | "movies/view@0"
  export type Actions = ":prev" | ":next" | ":current"
  export type MapKeys = keyof Map

  type ControlValue = Actions | MapKeys | Links | Url

  export interface Map {
    navigation: Controls
    collections: Controls
    "movies/view": Controls
    "movies/nav": Controls
    "back.collections": Controls
    "back.movies": Controls
  }
  export interface Controls {
    selector: string
    up?: ControlValue
    down?: ControlValue
    left?: ControlValue
    right?: ControlValue
    enter?: ControlValue

    first?: ControlValue
    last?: ControlValue
  }
}

declare namespace MyRedux {
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
