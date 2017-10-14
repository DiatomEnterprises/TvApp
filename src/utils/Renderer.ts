window["JSXCompiler"] = (nodeName: string, attributes: {}, ...children: JSX.Element[]) => {
  children = Array.prototype.concat.apply([], children)
  return { nodeName, attributes, children }
}

const getElement = (dom: JSX.Element) => {
  if (typeof dom.nodeName === "function") {
    return Renderer(dom.nodeName(dom.attributes))
  } else {
    return document.createElement(dom.nodeName)
  }
}

const setAttributes = (dom: JSX.Element, element: HTMLElement) => {
  for (const key in dom.attributes) {
    if (key.indexOf("-") !== -1) {
      element.setAttribute(key, dom.attributes[key])
    } else {
      element[key.toLowerCase()] = dom.attributes[key]
    }
  }
}

const appendChildren = (dom: JSX.Element, element: HTMLElement) => {
  for (const child of dom.children) {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child))
    } else {
      element.appendChild(Renderer(child))
    }
  }
}

export const Renderer = (dom: JSX.Element): HTMLElement => {
  const element = getElement(dom)
  setAttributes(dom, element)
  appendChildren(dom, element)
  return element
}
