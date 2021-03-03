import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItem from './NavigationItem/NavigationItem'
import NavigationItems from './NavigationItems'

configure({adapter: new Adapter()})

describe('<NavigationItems />', () => {
  it('should render two <NavigationItem> when not authenticated', () => {
    const wrapper = shallow(<NavigationItems />)
    const items = wrapper.find(NavigationItem)
    expect(items).toHaveLength(2)
  })

  it('should render three <NavigationItem> when authenticated', () => {
    const wrapper = shallow(<NavigationItems auth={true}/>)
    expect(wrapper.find(NavigationItem)).toHaveLength(3)
  })

  it('should render Logout <NavigationItem> when authenticated', () => {
    const wrapper = shallow(<NavigationItems auth={true}/>)
    expect(wrapper.contains(<NavigationItem link="/authentication">Logout</NavigationItem> )).toBeTruthy()
  })

  it('should render Sign In <NavigationItem> when not authenticated', () => {
    const wrapper = shallow(<NavigationItems auth={false}/>)
    expect(wrapper.contains(<NavigationItem link="/authentication">Sign In</NavigationItem>)).toBeTruthy()
  })
})