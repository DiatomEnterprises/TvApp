import { route } from "preact-router"
import { _, Events, C } from "#utils"

import { MapObject, MapComplex } from "./Map"

type Direction = "previous" | "next"

export const Navigate = (map: KeyboardMap.MapKeys, control: keyof KeyboardMap.Controls) => {
  const controls = MapObject[map]
  let action = controls[control]
  if (!action) return

  if (typeof action === "function") {
    action = action()
  }

  switch (true) {
    case action.includes("url/"): {
      const [, url] = action.split("url/")
      return handleUrl(url)
    }

    case action.includes(":"): {
      return handleActions(controls, action as KeyboardMap.Actions, map, control)
    }

    case action.includes("@"): {
      const [map, child] = action.split("@")
      return handleLinks(MapObject[map], child)
    }

    default:
      handleMaps(MapObject[action])
  }
}

const handleUrl = (url: string) => route(url, true)

const handleActions = (
  controls: KeyboardMap.Controls,
  action: KeyboardMap.Actions,
  map: KeyboardMap.MapKeys,
  control: keyof KeyboardMap.Controls
) => {
  const element = document.querySelector(`${controls.selector} .${C.FOCUSED_CLASS}`)
  if (!element || !element.parentElement) {
    return throwElementError(controls.selector)
  }

  switch (action) {
    case ":current": {
      return Events.click(element)
    }
    case ":prev": {
      return prevNext("previous", element, controls, map)
    }
    case ":next": {
      return prevNext("next", element, controls, map)
    }
    case ":prev:parent": {
      return prevNextParent("previous", element, controls, map)
    }
    case ":next:parent": {
      return prevNextParent("next", element, controls, map)
    }
    case ":complex": {
      return handleComplex(element, map, control)
    }
    default:
      throw new Error(`Unhandled Action ${action}`)
  }
}

const handleLinks = (controls: KeyboardMap.Controls, child: number | string) => {
  handleMaps(controls, child)
}

const handleMaps = (controls: KeyboardMap.Controls, child: number | string = 0) => {
  const element = document.querySelector(`${controls.selector}`)
  if (element) {
    Events.click(element.children[child])
  } else {
    throwElementError(controls.selector)
  }
}

const handleComplex = (element: Element, map: KeyboardMap.MapKeys, control: keyof KeyboardMap.Controls) => {
  const index = _.childIndex(element)
  const complex = MapComplex[map][control][index] as KeyboardMap.Links
  const [m, child] = complex.split("@")
  return handleLinks(MapObject[m], child)
}

const prevNext = (dir: Direction, el: Element, controls: KeyboardMap.Controls, map: KeyboardMap.MapKeys) => {
  const sibling = el[`${dir}ElementSibling`]
  const control = dir === "next" ? "rightLast" : "leftFirst"
  const action = controls[control]

  if (sibling) {
    Events.click(sibling)
  } else if (action === ":complex") {
    handleComplex(el, map, control)
  } else if (action) {
    handleMaps(MapObject[action])
  }
}

const prevNextParent = (dir: Direction, el: Element, controls: KeyboardMap.Controls, map: KeyboardMap.MapKeys) => {
  const parent = el.parentElement as HTMLElement
  const sibling = parent[`${dir}ElementSibling`]
  const control = dir === "next" ? "downLast" : "upFirst"
  const action = controls[control]

  if (sibling) {
    const index = _.childIndex(el)
    const length = sibling.children.length - 1
    const pos = Math.min(index, length)
    Events.click(sibling.children[pos])
  } else if (action === ":complex") {
    handleComplex(el, map, control)
  } else if (action) {
    handleMaps(MapObject[action])
  }
}

const throwElementError = (selector: string) => {
  throw new Error(`Can't find element ${selector}`)
}
