interface Route {
  path: string
  controller: Function
}

export class Router {
  element: HTMLElement
  routes: { [path: string]: Route | undefined } = {}

  constructor(element: HTMLElement) {
    this.element = element

    window.addEventListener("load", this.onChange.bind(this))
    window.addEventListener("hashchange", this.onChange.bind(this))
  }

  addRoute(path: string, controller: Function): void {
    this.routes[path] = { path, controller }
  }

  private onChange(): void {
    const path = location.hash.slice(1) || "/"
    const route = this.routes[path]
    const firstChild = this.element.firstChild

    if (route) {
      if (firstChild) {
        this.element.replaceChild(route.controller(), firstChild)
      } else {
        this.element.appendChild(route.controller())
      }
    }
  }
}
