const routeToKeyboard = (route: string): KeyboardMap.MapKeys => {
  switch (true) {
    case !!route.match(/collections\/\d$/):
      return "collections"
    case !!route.match(/collections\/back$/):
      return "back.collections"
    case !!route.match(/collections\/\d\/view$/):
      return "collections/view"
    case !!route.match(/collections\/\d\/back$/):
      return "back.collections/view"
    default:
      return "navigation"
  }
}

export const Route = { routeToKeyboard }
