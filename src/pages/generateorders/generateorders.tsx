import Taro from '@tarojs/taro';
import { View, Image} from '@tarojs/components';
// import { connect } from '@tarojs/redux'

// import { task } from '../../actions/task'

import './generateorders.scss';
import backArrow from '../../../.temp/assets/backArrow.png';
import orderlogo from '../../assets/orderlogo.png';

// @connect(({ counter }) => ({
//     counter
//   }), (dispatch) => ({
//     add () {
//       dispatch(task())
//     }
//   }))

interface State {
  name: string,
  phone: number,
  address: string
}

class generateorders extends Taro.Component<{}, State>  {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor (props) {
    super(props)
    this.state = { 
        name: '阳光图文打印店',
        phone: 1345454545445,
        address: '重庆邮电大学15栋'
     }
  }

  GotoPrint(){
      Taro.navigateTo({
          url:'../index/index'
      })
  }

  Return(){
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
    return (
      <View>
        <View className='top-box'>
          <Image onClick={this.Return} className='return' src={backArrow}></Image>
          <View className='top-tittle'>生成订单</View>
        </View>
        <View className='order-top-box'>
          <View className='order-logo-box'>
            <Image className='order-logo' src={orderlogo}/>
            <View>已经付款给阳光打印店</View>
          </View>
          <View className='order-logo-price'>24.2</View>
          <View className='order-loge-code'>收货码：12532674525467</View>
        </View>
        <View className='order-detail-table'>
          <View className='order-detail-left'>
            <View className='order-detail-top'>
              <View>打印店铺</View>
              <View>店铺联系方式</View>
              <View>打印大小</View>
              <View>打印份数</View>
              <View>打印方向</View>
              <View>打印方式</View>
            </View>
            <View className='order-detail-bottom'>
              <View>下单时间</View>
              <View>支付方式</View>
            </View>
          </View>
          <View className='order-detail-right'>
            <View className='order-detail-top'>
              <View>阳光图文打印店</View>
              <View>13617698456</View>
              <View>A4</View>
              <View>4</View>
              <View>单面</View>
              <View>黑白</View>
            </View>
            <View className='order-detail-bottom'>
              <View>2019-23-23</View>
              <View>在线下单</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default generateorders
