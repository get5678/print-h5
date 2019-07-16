import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import TabBar  from '../../components/TabBar/TabBar'
import './index.scss'

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {
<<<<<<< HEAD
=======

>>>>>>> 0434cf14dab5a9a71b3bbee4117ece28e51bb41d
    config: Config = {
    navigationBarTitleText: '首页'
  }


  navToLogin () {
    Taro.navigateTo({
      url: '../bindPhone/bindPhone'
    })
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      
      <View className='index'>
        <Button className='nav' onClick={this.navToLogin.bind(this)}>nav to login</Button>
        <View>this is index</View>
        <TabBar current={0}/>
      </View>
    )
  }
}

<<<<<<< HEAD
=======

>>>>>>> 0434cf14dab5a9a71b3bbee4117ece28e51bb41d
export default Index as ComponentClass<PageOwnProps, PageState>
