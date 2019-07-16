import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import returnPng from '../../assets/return.png';
import storePng from '../../assets/store.png';
// import { connect } from '@tarojs/redux'

// import { task } from '../../actions/task'

import './StoreInformation.scss';
import addressPng from '../../assets/address.png';
import phonePng from '../../../.temp/assets/phone.png';
import grey from '../../assets/grey.png';
import yuan from '../../assets/yuan.png';
import great from '../../assets/great.png';
import normal from '../../../.temp/assets/normal.png';
import color from '../../../.temp/assets/color.png';

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

class StoreInformation extends Taro.Component<{}, State>  {

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
        <View className='top'>
          <View className='top-box'>
            <Image onClick={this.Return} className='return' src={returnPng}></Image>
            <View className='top-tittle'>店面信息</View>
          </View>
        </View>
        <View className='information'>
          <Image className='store' src={storePng}></Image>
          <View className='detail'>
            <View className='storeName'>{this.state.name}</View>
            <View className='phone'>
              <Image className='detailPng' src={phonePng}></Image>
              <Text>{this.state.phone}</Text>
            </View>
            <View className='address'>
              <Image className='detailPng' src={addressPng}></Image>
              <Text>{this.state.address}</Text>
            </View>
          </View>
        </View>
        <View className='content-box'>
          <View className='price-table'>打印价格表</View>
          <View className='price-box'>
            <View className='printing'>
              <Image className='printingPng' src={grey}></Image>
              <View>
                <Text>
                  黑白打印
                </Text>
                <View className='yuan-box'>
                  <Image className='yuan' src={yuan}></Image>
                  0.2/张
                </View>
              </View>
            </View>
            <Image className='fire' src={great}></Image>
          </View>
          <View className='price-box'>
            <View className='printing'>
              <Image className='printingPng' src={color}></Image>
              <View>
                <Text>
                  彩色打印
                </Text>
                <View className='yuan-box'>
                  <Image className='yuan' src={yuan}></Image>
                  0.2/张
                </View>
              </View>
            </View>
            <Image className='fire' src={normal}></Image>
          </View>
        </View>
        <View className='button-box'>
          <View className='button' onClick={this.GotoPrint}>去打印</View>
        </View>
      </View>
    )
  }
}

export default StoreInformation
