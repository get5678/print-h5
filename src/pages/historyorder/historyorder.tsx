import Taro from '@tarojs/taro';
import { ComponentClass } from 'react'
import { View, Image, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import TabBar from '../../components/TabBar/TabBar';
import return2Png from '../../assets/backArrow.png';
import orderStore from '../../assets/orderStore.png';
import { BlankPage } from '../../components/blankPage/blankPage'
import './historyorder.scss';
import { asyncHistoryOrder,asyncTosure } from '../../actions/historyOrderList';
import { isArray } from 'util';

type PageStateProps = {
  historyOrderList: {
    data: any
  }
}

type PageDispatchProps = {
  asyncHistoryOrder: () => any,
  historyList: (payload) => any,
  asyncTosure: (payload) => any
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
  tosure(payload={}){
    dispatch(asyncTosure(payload))
  }
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

  ToSure(id){
    Taro.showModal({
      title: '确认收货',
      content: '点击确认收货成功',
    }).then((res)=>{
        if(res.confirm){
          this.props.tosure({orderId:id});
        }
      }
    ).then(()=>{
      this.forceUpdate(()=>{
          this.props.historyList({
            page: 1,
            count: 5
          });
        }
      )
    })
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps,"props")
  }

  componentWillUnmount () { }

  componentDidShow () {
    if(Taro.getStorageSync('token')){
      this.props.historyList({
        page: 1,
        count: 5
      });
    } else{
      Taro.showModal({
        title: '暂未登陆',
        content: '请点击确认按钮跳转登陆页面',
      }).then((res)=>{
          if(res.confirm){
            Taro.navigateTo({
              url:'../bindPhone/bindPhone'
            })
          }
        }
      )
    }
   }

  componentDidHide () { }

  render () {
    let res = this.props.historyOrderList.data;   
    res = isArray(res)?res:[];
    console.log(this.props.historyOrderList.data)
    const OrderStoreBox = res.map((res)=>{
      let status;

      if(res.orderStatus==2){
        status = '已完成'
      } else if(res.orderStatus==1){
        status = '正在打印'
      } else {
        status = '取货成功'
      }

      return (
      <View className='order-store-box'>
        <View className='order-store-top'>
          <View className='order-store-name'>
            <Image className='orderStore' src={orderStore}/>
            <View>{res.shopName}</View>
          </View>
         <Text className='status'>{status}</Text>
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
          {status=='取货成功'?
            <View onClick={this.ToMore.bind(this,res.orderId,'historyorder/historyorder')} className='ToMore'>查看详情</View>:
            <View className='choose-box' >
            <View onClick={this.ToSure.bind(this,res.orderId)} className='ToSure'>确认收货</View>
            <View onClick={this.ToMore.bind(this,res.orderId,'historyorder/historyorder')} className='ToMore'>查看详情</View>
          </View>
        }
        </View>
      </View>)}
      )
    return (
      <View className='body-box'>
        <View className='history-order-top-box'>
          <View className='nowOrder-top-box'>
            <View onClick={this.Return} className='return-box'>
              <Image className='nowOrder-return' src={return2Png}></Image>
            </View>
            <View className='nowOrder-top-tittle'>历史订单</View>
          </View>
          <View className='all-order'>
              <Text>全部</Text>
              <View className='all-line'></View>
          </View>
        </View>
        {res.length > 0?
        <View className='history-content'>
          {OrderStoreBox}
        </View>:<BlankPage
                    title='您当前还没有订单'
                    picture={require('../../assets/blank-compents/blank-order.png')}
                />}
        <TabBar current={1}/>
      </View>
    )
  }
}

export default historyorder as ComponentClass<PageOwnProps, PageState>
