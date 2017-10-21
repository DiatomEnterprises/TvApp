import Preact from "#preact"
import * as classNames from "classnames"

export namespace CollectionItem {
  export interface Item {
    name: string
    length: number
  }

  export interface Props {
    item: Item
    index: number
    current: null | number
    onClick: any
  }
}

const MAX_WIDTH = 500

export class Item extends Preact.Component<CollectionItem.Props, {}> {
  render({ item, index, current, onClick }: CollectionItem.Props) {
    const pos = (index - (current || 0)) * MAX_WIDTH
    const className = classNames("c-collections__item", { "c-focused": current === index })
    const style = { transform: `translateX(${pos}px)`, opacity: 0.0000001 }
    if (pos < 0) {
      delete style.transform
    } else {
      delete style.opacity
    }

    return (
      <div className={className} onClick={onClick} style={style}>
        <div className="c-item__content">
          <div className="float__right c-item__length">{item.length}</div>

          <div className="t-tx--center center__both">
            <div className="h4">Collection</div>
            <div className="h3">{item.name}</div>
          </div>
        </div>

        <div className="c-card" />
        <div className="c-card" />
      </div>
    )
  }
}
