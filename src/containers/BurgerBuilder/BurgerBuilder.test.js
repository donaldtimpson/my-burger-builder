import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import { BurgerBuilder } from './BurgerBuilder'

configure({adapter: new Adapter()})

describe('<BurgerBuilder />', () => {
  it('should render <BuildControls /> when passed ingredients', () => {
    const wrapper = shallow(<BurgerBuilder ingredients={{salad: 0}} />)
    expect(wrapper.find(BuildControls)).toBeTruthy()
  })
})