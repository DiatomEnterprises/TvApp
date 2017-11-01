import { route } from "preact-router"
import { Events } from "#utils"

import { MapObject, MapComplex } from "./Map"
const FOCUSED_CLASS = ".c-focused"

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
      const data = { map, control }
      return handleActions(controls, action as KeyboardMap.Actions, data)
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
  { map, control }: { map: KeyboardMap.MapKeys; control: keyof KeyboardMap.Controls }
) => {
  const element = document.querySelector(`${controls.selector} ${FOCUSED_CLASS}`)
  if (!element) {
    return throwElementError(controls.selector)
  }

  switch (action) {
    case ":current": {
      return Events.click(element)
    }
    case ":prev": {
      const sibling = element.previousElementSibling
      if (sibling) {
        Events.click(sibling)
      } else if (controls.first) {
        handleMaps(MapObject[controls.first])
      }
      return
    }
    case ":next": {
      const sibling = element.nextElementSibling
      if (sibling) {
        Events.click(sibling)
      } else if (controls.last) {
        handleMaps(MapObject[controls.last])
      }
      return
    }
    case ":complex":
      const parent = element.parentElement as HTMLElement
      const index = Array.from(parent.children).indexOf(element)
      const complex = MapComplex[map][control][index] as KeyboardMap.Links
      const [m, child] = complex.split("@")
      return handleLinks(MapObject[m], child)
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

const throwElementError = (selector: string) => {
  throw new Error(`Can't find element ${selector}`)
}
