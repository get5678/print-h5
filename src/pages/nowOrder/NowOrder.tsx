import { ComponentClass } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import return2Png from '../../assets/return2.png';


import { add, minus, asyncAdd } from '../../actions/counter'

import './NowOrder.scss'
import orderSrore from '../../assets/orderSrore.png';
import ppt from '../../assets/ppt.png';

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

interface State {
  justIcon: string,
  inputValue: string
}

interface NowOrder {
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
class NowOrder extends Taro.Component<{}, State> {
  constructor(props){
    super(props);
    this.state={
      justIcon:'',
      inputValue: ''
    }
  }
    config: Config = {
    navigationBarTitleText: '首页'
  }

GotoFeedback(inputValue,justIcon){
  console.log("这里是提交内容"+inputValue,justIcon)
    // Taro.navigateTo({
    //     url:'../'
    // })
}

Return(){
    Taro.navigateTo({
        url:'../'
    })
}
onInput = e => {
  console.log(e.detail.value)
  this.setState({
    inputValue: e.detail.value
  })
}
Icon(this,Icon,e){
  console.log(this,Icon,e);
  this.setState({
    justIcon:Icon
  })
}
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    // const {justIcon,inputValue} = this.state;
    const OrderStoreBox = (
      <View className='file-type-box'>
            <Image className='file-type' src={ppt}/>
            <View className='order-time-box'>
              <View>14435454534243423</View>
              <View className='order-time'>2019/06/02</View>
            </View>
          </View>
    )
    return (
      <View className='body-box'>
        <View className='nowOrder-top-box'>
          <Image onClick={this.Return} className='nowOrder-return' src={return2Png}></Image>
          <View className='nowOrder-top-tittle'>当前订单</View>
        </View>
        <View className='all-order'>
          <Text>全部</Text>
          <View className='all-line'></View>
        </View>
        <View className='order-store-box'>
          <View className='order-store-top'>
            <View className='order-store-name'>
              <Image className='orderStore' src={orderSrore}/>
              <View>阳光图文打印店</View>
            </View>
            <Text className='status'>已完成</Text>
          </View>
          {OrderStoreBox}
        </View>
      </View>
    )
  }
}

export default NowOrder as ComponentClass<PageOwnProps, PageState>
