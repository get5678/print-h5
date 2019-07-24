import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image } from '@tarojs/components'
import returnPng from '../../assets/return.png';
import storePng from '../../assets/store.png';
import { connect } from '@tarojs/redux'

import { asyncShopGet } from '../../actions/getShopDetail';

import './StoreInformation.scss';
import addressPng from '../../assets/address.png';
import phonePng from '../../../.temp/assets/phone.png';
import grey from '../../assets/grey.png';
import yuan from '../../assets/yuan.png';
import great from '../../assets/great.png';


type PageStateProps = {
  getShopDetail: {
    data: any
  }
}

type PageDispatchProps = {
  asyncShopGet: () => any,
  shopGet: (payload) => any
}

type PageOwnProps = {}

type PageState = {
  phone: number,
  name:string,
  address: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface StoreInformation {
  props: IProps;
}

@connect(({ getShopDetail }) => ({
  getShopDetail
}), (dispatch) => ({
  shopGet(payload={}){
    dispatch(asyncShopGet(payload))
  },
}))

class StoreInformation extends Component<{}, PageState> {

  config = {
    navigationBarTitleText: '详情页面'
  }

  constructor (props) {
    super(props);
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

  componentWillMount () {
    if (this.$router.params.storeId) {
      this.props.shopGet({ id:this.$router.params.storeId })
    }
  }

  componentWillUnmount () {
  }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    console.log(this.props)
    const response = this.props.getShopDetail.data;
    let pricebox = response.shopPrice || [];

    const printingBox = (pricebox.map((res)=>{
      return (<View className='price-box'>
            <View className='printing'>
              <Image className='printingPng' src={res.printTypeUrl||grey}></Image>
              <View>
                <Text>
                  {res.price.printType||'黑白打印'}
                </Text>
                <View className='yuan-box'>
                  <Image className='yuan' src={yuan}></Image>
                  {res.price.printPrice||0.2}/张
                </View>
              </View>
            </View>
            <Image className='fire' src={great}></Image>
          </View>)
    }))
    return (
      <View className='index'>
         <View className='top'>
          <View className='top-box'>
            <Image onClick={this.Return} className='return' src={returnPng}></Image>
            <View className='top-tittle'>店面信息</View>
          </View>
        </View>
        <View className='information'>
          <Image className='store' src={response.shopAvatar||storePng}></Image>
          <View className='detail'>
            <View className='storeName'>{response.shopName||this.state.name}</View>
            <View className='phone'>
              <Image className='detailPng' src={phonePng||phonePng}></Image>
              <Text>{response.shopPhone||this.state.phone}</Text>
            </View>
            <View className='address'>
              <Image className='detailPng' src={addressPng}></Image>
              <Text>{response.shopAddress||this.state.address}</Text>
            </View>
          </View>
        </View>
        <View className='content-box'>
          <View className='price-table'>打印价格表</View>
          {printingBox}
        </View>
        <View className='button-box'>
          <View className='button' onClick={this.GotoPrint}>去打印</View>
        </View>
      </View>
    )
  }
}

export default StoreInformation as ComponentClass<PageOwnProps, PageState>
