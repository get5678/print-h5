import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import TabBar from '../../components/TabBar/TabBar';
import return2Png from '../../assets/return2.png';
import { add, minus, asyncAdd } from '../../actions/counter';
import orderSrore from '../../assets/orderSrore.png';
import ppt from '../../assets/ppt.png';
import './HistoryOrder.scss';

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

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface State {
  justIcon: string,
  inputValue: string
}

interface Historyorder {
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
class Historyorder extends Taro.Component<{}, State> {
  constructor(props){
    super(props);
    this.state={
      justIcon:'',
      inputValue: ''
    }
  }

Return(){
    Taro.navigateTo({
        url:'../pages/mine/mine'
    })
}
ToMore(){
  Taro.navigateTo({
    url:'../'
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
          <View className='nowOrder-top-tittle'>历史订单</View>
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
          <View className='file-type-bottom'>
            <View className='file-price'>价格：<Text className='price-yuan'>￥1.6</Text></View>
            <View onClick={this.ToMore} className='ToMore'>查看详情</View>
          </View>
        </View>
        <TabBar current={1}/>
      </View>
    )
  }
}

export default Historyorder
