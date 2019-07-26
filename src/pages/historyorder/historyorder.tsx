import Taro from '@tarojs/taro';
import { ComponentClass } from 'react'
import { View, Image, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import TabBar from '../../components/TabBar/TabBar';
import return2Png from '../../assets/backArrow.png';
import orderStore from '../../assets/orderStore.png';
import { BlankPage } from '../../components/blankPage/blankPage'
import ppt from '../../assets/ppt.png';
import './historyorder.scss';
import { asyncHistoryOrder } from '../../actions/historyOrderList';
import { isArray } from 'util';

type PageStateProps = {
  historyOrderList: {
    data: any
  }
}

type PageDispatchProps = {
  asyncHistoryOrder: () => any,
  historyList: (payload) => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface historyorder {
  props: IProps;
}

@connect(({ historyOrderList }) => ({
  historyOrderList
}), (dispatch) => ({
  historyList(payload={}){
    dispatch(asyncHistoryOrder(payload))
  },
}))

class historyorder extends Taro.Component<{}, PageState> {
 
Return(){
    Taro.navigateTo({
        url:'../mine/mine'
    })
}

ToMore(orderId,thisPage,e){
  Taro.navigateTo({
    url:'../generateorders/generateorders?orderId='+orderId+'&return='+thisPage
  })
}

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps,"props")
  }

  componentWillUnmount () { }

  componentDidShow () {
    this.props.historyList({
      page: 1,
      count: 5
    })
   }

  componentDidHide () { }

  render () {
    
    let res = this.props.historyOrderList.data;
    res = isArray(res)?res:[];
    
    const OrderStoreBox = res.map((res)=>{
      return (
      <View className='order-store-box'>
        <View className='order-store-top'>
          <View className='order-store-name'>
            <Image className='orderStore' src={orderStore}/>
            <View>{res.shopName}</View>
          </View>
          <Text className='status'>{res.orderStatus==2?'已完成':'正在打印'}</Text>
        </View>
        <View className='file-type-box'>
          <Image className='file-type' src={res.documentTypeUrl}/>
          <View className='order-time-box'>
            <View>提货码：{res.receivingCode}</View>
            <View className='order-time'>{res.gmtCreate}</View>
          </View>
        </View>
        <View className='file-type-bottom'>
          <View className='file-price'>价格：<Text className='price-yuan'>￥{res.payment}</Text></View>
          <View onClick={this.ToMore.bind(this,res.orderId,'historyorder/historyorder')} className='ToMore'>查看详情</View>
        </View>
      </View>)}
      )
    return (
      <View className='body-box'>
        <View className='nowOrder-top-box'>
          <Image onClick={this.Return} className='nowOrder-return' src={return2Png}></Image>
          <View className='nowOrder-top-tittle'>历史订单</View>
        </View>
        {this.props.historyOrderList.data.length > 0?
        <View>
          <View className='all-order'>
            <Text>全部</Text>
            <View className='all-line'></View>
          </View>
          {OrderStoreBox}
        </View>:<BlankPage
                    title='您当前还没有订单'
                    picture={require('../../assets/blank-compents/blank-box-empty.png')}
                />}
        <TabBar current={1}/>
      </View>
    )
  }
}

export default historyorder as ComponentClass<PageOwnProps, PageState>
