declare namespace KeyboardMap {
  type NextPrev = ":prev" | ":next"
  export type MapKeys = keyof Map

  export interface Map {
    navigation: Controls
    collections: Controls
  }
  export interface Controls {
    selector: string
    up?: NextPrev | MapKeys
    down?: NextPrev | MapKeys
    left?: NextPrev | MapKeys
    right?: NextPrev | MapKeys

    first?: string
    last?: string
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
      focused: keyof KeyboardMap.Map
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
