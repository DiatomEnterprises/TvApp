import Preact from "#preact"
import { route } from "preact-router"
import * as classNames from "classnames"

import collections from "./data"
import { Slider } from "#components"

import "./Collections.scss"

namespace Collections {
  export interface State {
    current: null | number
  }
  export interface Item {
    name: string
    length: number
  }
}

export class Collections extends Preact.Component<{}, Collections.State> {
  constructor() {
    super()

    this.state = { current: null }
  }

  onReset = () => {
    this.setState({ current: null })
  }

  onClick(index: number) {
    if (index === this.state.current) {
      route(`/collections/view/${collections[index].id}`)
    } else {
      this.setState({ current: index })
    }
  }

  renderItem = (item: Collections.Item, index: number) => {
    const { current } = this.state
    const props: Slider.Props = {
      className: classNames("c-collections__item", { "c-focused": current === index }),
      onClick: this.onClick.bind(this, index),
      onReset: this.onReset,
      modifier: index - (current || 0),
      direction: "X",
      size: 500,
      map: "collections"
    }

    return (
      <Slider {...props}>
        <div className="c-item__content">
          <div className="float__right c-item__length">{item.length}</div>

          <div className="t-tx--center center__both">
            <div className="h4">Collection</div>
            <div className="h3">{item.name}</div>
          </div>
        </div>

        <div className="c-card" />
        <div className="c-card" />
      </Slider>
    )
  }

  render() {
    return <div className="c-collections">{collections.map(this.renderItem)}</div>
  }
}
