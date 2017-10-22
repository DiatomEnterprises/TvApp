import Preact from "#preact"
import { connect } from "preact-redux"

import { Item, CollectionItem } from "./Item"
import { UtilsActions } from "#redux/actions"
import collections from "./data"

import "./Collections.scss"

namespace Collections {
  export type Props = Router.Props & MyRedux.Dispatch.Props & MyRedux.Reducers.Utils
  export interface State {
    current: null | number
  }
}

class CollectionsComponent extends Preact.Component<Collections.Props, Collections.State> {
  constructor(props: Collections.Props) {
    super(props)

    this.state = { current: null } as Collections.State
  }

  componentWillReceiveProps(nextProps: Collections.Props) {
    if (nextProps.focused !== "collections" && nextProps.focused !== this.props.focused) {
      this.setState({ current: null })
    }
  }

  onClick(index: number) {
    const { focused, dispatch } = this.props
    this.setState({ current: index })

    if (focused !== "collections") {
      this.props.dispatch(UtilsActions.focus("collections"))
    }
  }

  render({  }: Collections.Props, { current }: Collections.State) {
    return (
      <div className="c-collections">
        {collections.map((item: CollectionItem.Item, index) => (
          <Item item={item} index={index} onClick={this.onClick.bind(this, index)} current={current} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({ utils }: MyRedux.State) => ({ focused: utils.focused })

const CollectionsConnect = connect(mapStateToProps)(CollectionsComponent as any)

export const Collections: Router.Route = () => <CollectionsConnect />
