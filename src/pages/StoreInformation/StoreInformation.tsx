import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image } from '@tarojs/components'
import returnPng from '../../assets/return.png';
import { connect } from '@tarojs/redux'
import { asyncShopGet } from '../../actions/getShopDetail';
import './StoreInformation.scss';
import addressPng from '../../assets/address.png';
import phonePng from '../../../.temp/assets/phone.png';
import yuan from '../../assets/yuan.png';
import great from '../../assets/great.png';
import normal from '../../assets/normal.png';


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

type PageState = {}

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
  }

  GotoPrint(){
    if(Taro.getStorageSync('token')){
      Taro.navigateTo({
        url:'../document/document'
      })
    }else{
      Taro.showToast({
        title: '请先登陆哟',
        icon: 'none',
        duration: 2000,
        mask:true
      })
      Taro.navigateTo({
        url:'../mine/mine'
      })
    }
  }

  Return(){
      Taro.navigateTo({
          url:'../index/index'
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
    const response = this.props.getShopDetail.data;
    let pricebox = response.shopPrice||[];

    const printingBox = (pricebox.map((res)=>{
      return (<View className='price-box'>
            <View className='printing'>
              <Image className='printingPng' src={res.printTypeUrl}></Image>
              <View className='printing-detail'>
                <Text>
                  {res.price.printType}
                </Text>
                <View className='yuan-box'>
                  <Image className='yuan' src={yuan}></Image>
                  {res.price.printPrice}/张
                </View>
              </View>
            </View>
            <Image className='fire' src={res.hot > 10? great:normal}></Image>
          </View>)
    }))
    return (
      <View className='index'>
         <View className='top'>
          <View className='top-box'>
            <Image onClick={this.Return} className='store-return' src={returnPng}></Image>
            <View className='top-tittle'>店面信息</View>
          </View>
        </View>
        <View className='information'>
          <Image className='store' src={response.shopAvatar}></Image>
          <View className='detail'>
            <View className='storeName'>{response.shopName}</View>
            <View className='phone'>
              <Image className='detailPng' src={phonePng}></Image>
              <Text>{response.shopPhone}</Text>
            </View>
            <View className='address'>
              <Image className='detailPng' src={addressPng}></Image>
              <Text>{response.shopAddress}</Text>
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
