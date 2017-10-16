import Preact from "#preact"
import * as classNames from "classnames"
import { connect } from "preact-redux"

const items = ["Featured", "Recently Added", "Best of Catch-Up", "Subscription", "Collections", "Browse"]

const NavItem = ({ item, focused }: { item: string; focused: boolean }) => {
  return <div className={classNames("c-nav__item", { "c-focused": focused })}>{item}</div>
}

class NavigationComponent extends Preact.Component<Reducers.Navigation, {}> {
  render({ focused }: Reducers.Navigation) {
    return <div className="c-nav">{items.map(item => <NavItem item={item} focused={focused === item} />)}</div>
  }
}

const mapStateToProps = ({ navigation }: { navigation: Reducers.Navigation }) => ({
  focused: navigation.focused
})

export const Navigation = connect(mapStateToProps)(NavigationComponent as any)
