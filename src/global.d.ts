declare namespace KeyboardMap {
  type SpecialActions = ":prev" | ":next" | ":current"
  export type MapKeys = keyof Map

  export interface Map {
    navigation: Controls
    collections: Controls
    "collections/view": Controls
  }
  export interface Controls {
    selector: string
    up?: SpecialActions | MapKeys
    down?: SpecialActions | MapKeys
    left?: SpecialActions | MapKeys
    right?: SpecialActions | MapKeys
    enter?: SpecialActions | MapKeys

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
      focused?: keyof KeyboardMap.Map
      navigationShow?: boolean
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
