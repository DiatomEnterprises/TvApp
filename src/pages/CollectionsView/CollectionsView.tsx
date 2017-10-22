import Preact from "#preact"
import { connect } from "preact-redux"
import * as classNames from "classnames"

// import collections from "./data"
import { Slider } from "#components"
import { TitleActions, UtilsActions } from "#redux/actions"

// import "./Collections.scss"

class CollectionsViewComponent extends Preact.Component<MyRedux.Dispatch.Props, {}> {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(TitleActions.change("Superheroes", "Collections"))
    dispatch(UtilsActions.navigation(false))
  }

  componentWillUnmount() {
    this.props.dispatch(UtilsActions.navigation(true))
  }

  render() {
    return <div className="c-collection">Hey</div>
  }
}

export const CollectionsView = connect()(CollectionsViewComponent as any)
