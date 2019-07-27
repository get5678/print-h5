import Taro from '@tarojs/taro';
import { ComponentClass } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import TabBar from '../../components/TabBar/TabBar';
import './noworder.scss'
import orderStore from '../../assets/orderStore.png';
import { BlankPage } from '../../components/blankPage/blankPage'
import { asyncNoworder,asyncNowToSure } from '../../actions/nowOrderList';
import { isArray } from 'util';

type PageStateProps = {
  nowOrderList: {
    data: any
  }
}

type PageDispatchProps = {
  asyncNoworder: (payload) => any,
  NowList: (payload) => any,
  tosure: (payload) => any,
  asyncnNowToSure: (payload) => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface noworder {
  props: IProps;
}

@connect(({ nowOrderList }) => ({
  nowOrderList
}), (dispatch) => ({
  NowList(payload={}){
    dispatch(asyncNoworder(payload))
  },
  tosure(payload={}){
    dispatch(asyncNowToSure(payload))
  }
}))


class noworder extends Taro.Component<{}, PageState> {
 

  ToMore(orderId,thisPage,e){
    Taro.navigateTo({
      url:'../generateorders/generateorders?orderId='+orderId+'&return='+thisPage
    })
  }

  ToSure(id){
    this.props.tosure({orderId:id});
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount () { }

  componentDidShow () { 
    if(Taro.getStorageSync('token')){
      this.props.NowList({
        page: 1,
        count:5
      })
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
    let res = this.props.nowOrderList.data;
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
          <View className='choose-box' >
            <View onClick={this.ToSure.bind(this,res.orderId)} className='ToSure'>确认收货</View>
            <View onClick={this.ToMore.bind(this,res.orderId||1,'noworder/noworder')} className='ToMore'>查看详情</View>
          </View>
        </View>
      </View>)}
      )

    return (
      <View className='body-box'>
        <View className='now-order-top-box'>
          <View className='nowOrder-top-box'>
            <View className='nowOrder-top-tittle'>当前订单</View>
          </View>
          <View className='all-order'>
            <Text>全部</Text>
            <View className='all-line'></View>
          </View>
        </View>
        {this.props.nowOrderList.data.length > 0?
        <View className='now-content'>
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

export default noworder as ComponentClass<PageOwnProps, PageState>
