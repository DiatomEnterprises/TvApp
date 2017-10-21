declare namespace KeyboardMap {
  type NextPrev = ":prev" | ":next"
  export interface Map {
    navigation: Controls
  }
  export interface Controls {
    selector: string
    up?: NextPrev
    down?: NextPrev
    left?: NextPrev
    right?: NextPrev

    first?: undefined
    last?: undefined
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
  export type Route = (props: { path: string; default?: boolean }) => JSX.Element
}
