const routeToKeyboard = (route: string): KeyboardMap.MapKeys => {
  switch (true) {
    case !!route.match(/collections\/(\d+)$/):
      return "collections"
    case !!route.match(/collections\/back$/):
      return "back.collections"
    case !!route.match(/movies\/(\d+)\/back$/):
      return "back.movies"
    case !!route.match(/movies\/(\d+)\/movie\/(\d+)$/):
      return "movies/view"
    case !!route.match(/movies\/(\d+)\/buy$/):
    case !!route.match(/movies\/(\d+)\/sort$/):
      return "movies/nav"
    case !!route.match(/movies\/(\d+)\/name$/):
    case !!route.match(/movies\/(\d+)\/rating$/):
    case !!route.match(/movies\/(\d+)\/date$/):
      return "movies/dropdown"
    default:
      return "navigation"
  }
}

export const Route = { routeToKeyboard }
