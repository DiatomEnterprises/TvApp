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

declare namespace Reducers {
  export interface Utils {
    focused: keyof KeyboardMap.Map
  }
}

declare namespace Router {
  export type Route = (props: { path: string; default?: boolean }) => JSX.Element
}
