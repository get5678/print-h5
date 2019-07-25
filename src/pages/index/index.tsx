import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Input, Image, Text, ScrollView } from '@tarojs/components'
import { BlankPage } from '../../components/blankPage/blankPage'
import { connect } from '@tarojs/redux'
import { asyncGetShopList } from '../../actions/shop'
// import { add, minus, asyncAdd } from '../../actions/counter'
import TabBar from '../../components/TabBar/TabBar'
import './index.scss'

type PageStateProps = {
  shop: {
    shopList: ShopList[]
  }
}

type PageDispatchProps = {
  getShopList: () => void;
}

type PageOwnProps = {}

type PageState = {
  searchText: string;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

// 商品列表 type
interface ShopList {
  shopAddress: string;
  shopAvatar: string;
  shopId: string;
  shopName: string;
  shopPrice: number;
}

@connect(
  ({ shop } ) => ({
      shop
  }), (dispatch) => ({
      getShopList(params) {
          dispatch(asyncGetShopList(params));
      }
  })
)

class Index extends Component<PageStateProps, PageState> {

  config: Config = {
    navigationBarTitleText: '主页'
  }
  /**
   * @description 方便测试用的跳转功能
   * @param {number} type
   * @memberof Index
   */
  navTo(type: number) {
    if (type === 1) {
      Taro.navigateTo({
        url: '../bindPhone/bindPhone'
      })
    } else if (type === 2) {
      Taro.navigateTo({
        url: '../bindWX/bindWX'
      })
    }
  }

  /**
   * @description 处理输入搜索关键词
   * @param {*} e
   * @memberof Index
   */
  handleInputSearch(e: { detail: { value: string } }) {
    this.setState({
      searchText: e.detail.value
    })
  }

  /**
   * @description 处理扫二维码
   * @memberof Index
   */
  handleScanQRCode() {
    Taro.showToast({
      title: '暂未开放',
      icon: 'none',
      duration: 1000,
      mask: true
    })
  }

  /**
   * @description 跳转到详情
   * @param {number} id 商店id
   * @memberof Index
   */
  handleToShop(id: number) {
    Taro.navigateTo({
      url: `../StoreInformation/StoreInformation?storeId=${id}`
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentDidMount() {
    this.props.getShopList()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { searchText } = this.state;
    const { shopList = [] } = this.props.shop

    const indexTop = (
      <View className='index-top'>
          <View className='index-top-row'>
            <Image className='index-icon' src={require('../../assets/images/index/magnifyingGlass.png')}></Image>
            <Input className='index-input' placeholder='请输入打印店名字' placeholderClass='index-inputPL' maxLength={40} onInput={this.handleInputSearch.bind(this)} value={searchText}></Input>
          </View>
          <Image className='index-icon' src={require('../../assets/images/index/scanQRCode.png')} onClick={this.handleScanQRCode.bind(this)}></Image>
        </View>
    )

    const items = shopList.map(item => {
      return (
        <View key={item.shopId} className='index-item'>
          <Image className='index-item-image' src={item.shopAvatar}></Image>
          <View className='index-item-column'>
            <Text className='index-item-title'>{item.shopName}</Text>
            <Text className='index-item-address'>
              <Image className='index-item-address-icon' src={require('../../assets/images/index/address.png')}></Image>
              {item.shopAddress}
            </Text>
          </View>
          <View className='index-item-column'>
            <Text className='index-item-price'>{item.shopPrice}/张</Text>
            <Button onClick={this.handleToShop.bind(this, item.shopId)} className='index-item-button'>打印</Button>
          </View>
        </View>
      )
    })

    return (
      <View className='index'>
        {/* <Button className='nav' onClick={this.navTo.bind(this, 1)}>nav to login</Button> */}
        {/* <Button className='nav' onClick={this.navTo.bind(this, 2)}>nav to bindWX</Button> */}
        {indexTop}
        {
          shopList.length > 0 ?
            <View className='index-content'>
              <Text className='index-title'>附近打印店</Text>
              <ScrollView className='index-list'>
                {items}
              </ScrollView>
            </View>
            :
            <BlankPage
              title='暂无打印店相关信息'
              picture={require('../../assets/images/index/blank-house.png')}
            />
        }
        <TabBar current={0} />
      </View>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>

