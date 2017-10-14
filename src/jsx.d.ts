declare namespace JSX {
  interface Element {
    nodeName: string
    children: VirtualDom[]
    attributes: { [key: string]: any }
  }
  interface IntrinsicElements {
    br: any
    div: any
    span: any
    video: any
  }
}
