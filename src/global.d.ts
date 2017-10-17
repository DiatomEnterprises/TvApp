declare namespace Reducers {
  export interface Navigation {
    focused: string
  }
}

declare namespace Router {
  export type Route = (props: { path: string }) => JSX.Element
}
