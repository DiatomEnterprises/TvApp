declare namespace KeyboardMap {
  export type Links = "navigation@4"
  export type Actions = ":prev" | ":next" | ":current"
  export type MapKeys = keyof Map

  export interface Map {
    navigation: Controls
    collections: Controls
    "back.collections": Controls
    "collections/view": Controls
  }
  export interface Controls {
    selector: string
    up?: Actions | MapKeys | Links
    down?: Actions | MapKeys | Links
    left?: Actions | MapKeys | Links
    right?: Actions | MapKeys | Links
    enter?: Actions | MapKeys | Links

    first?: Actions | MapKeys | Links
    last?: Actions | MapKeys | Links
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
      back?: string
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
