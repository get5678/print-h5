import Taro from '@tarojs/taro';
import { View, Image} from '@tarojs/components';
import { connect } from '@tarojs/redux'

import './generateorders.scss';
import backArrow from '../../../.temp/assets/backArrow.png';
import orderlogo from '../../assets/orderlogo.png';
import { asyncorderDetail } from '../../actions/orderDetail';

type PageStateProps = {
  orderDetail: {
    data: any
  }
}

type PageDispatchProps = {
  asyncorderDetail: () => any,
  getOrderDetail: (payload)=> any
}

type PageOwnProps = {}

type PageState = {
  name: string,
  phone: number,
  address: string,
  router: string,
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface generateorders {
  props: IProps;
}

@connect(({ orderDetail }) => ({
  orderDetail
}), (dispatch) => ({
  getOrderDetail(payload={}){
    dispatch(asyncorderDetail(payload))
  },
}))

class generateorders extends Taro.Component<{}, PageState>  {

  config = {
    navigationBarTitleText: '订单详情'
  }

  constructor (props) {
    super(props)
    this.state = { 
        name: '阳光图文打印店',
        phone: 1345454545445,
        address: '重庆邮电大学15栋',
        router: 'noworder/noworder'
     }
  }

  GotoPrint(){
      Taro.navigateTo({
          url:'../index/index'
      })
  }

  Return(router){
      Taro.navigateTo({
          url:'../'+router
      })
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () {
    this.setState({
      router: this.$router.params.return
    })
    this.props.getOrderDetail({
      orderId: this.$router.params.orderId
    })
   }

  componentDidHide () { }

  render () {
    const res = this.props.orderDetail.data;
    return (
      <View>
        <View className='top-box'>
          <Image onClick={this.Return.bind(this,this.state.router)} className='return' src={backArrow}></Image>
          <View className='top-tittle'>生成订单</View>
        </View>
        <View className='order-top-box'>
          <View className='order-logo-box'>
            <Image className='order-logo' src={orderlogo}/>
            <View>已经付款给{res.shopName}</View>
          </View>
          <View className='order-logo-price'>-{res.payment}</View>
          <View className='order-loge-code'>收货码：{res.receivingCode}</View>
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
              <View>{res.shopName}</View>
              <View>{res.phoneNum}</View>
              <View>{res.printSize}</View>
              <View>{res.printNum}</View>
              <View>{res.printDirection}</View>
              <View>{res.printType}</View>
            </View>
            <View className='order-detail-bottom'>
              <View>{res.gmtCreate}</View>
              <View>{res.payMethod?'在线下单':'线下支付'}</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default generateorders
