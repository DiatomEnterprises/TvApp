import { Events } from "#utils"

const FOCUSED_CLASS = ".c-focused"

const Mapping: KeyboardMap.Map = {
  navigation: {
    selector: ".c-nav",
    up: ":prev",
    down: ":next",
    right: "collections"
  },
  collections: {
    selector: ".c-collections",
    first: "navigation:4",
    left: ":prev",
    right: ":next"
  }
}

const handleMap = (map: KeyboardMap.MapKeys, child: number | string) => {
  const controls = Mapping[map]
  const element = document.querySelector(`${controls.selector}`)
  if (!element) return
  Events.click(element.children[child])
}

export const Execute = (map: KeyboardMap.MapKeys, control: keyof KeyboardMap.Controls) => {
  const controls = Mapping[map]
  const action = controls[control]
  const element = document.querySelector(`${controls.selector} ${FOCUSED_CLASS}`)
  if (!element) return

  switch (action) {
    case ":prev": {
      const sibling = element.previousElementSibling
      if (sibling) {
        Events.click(sibling)
      } else if (controls.first) {
        const [map, child] = controls.first.split(":")
        handleMap(map as KeyboardMap.MapKeys, child)
      }
      return
    }
    case ":next": {
      const sibling = element.nextElementSibling
      if (sibling) {
        Events.click(sibling)
      } else if (controls.last) {
        const [map, child] = controls.last.split(":")
        handleMap(map as KeyboardMap.MapKeys, child)
      }
      return
    }
    case undefined:
      return
    default:
      return handleMap(action as KeyboardMap.MapKeys, 0)
  }
}
