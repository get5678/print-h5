import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Input, Image, Text, ScrollView } from '@tarojs/components'
import { BlankPage } from '../../components/blankPage/blankPage'
import { connect } from '@tarojs/redux'
import { asyncGetShopList } from '../../actions/shop'
// import { asyncOnLogin } from '../../actions/login'
// import { add, minus, asyncAdd } from '../../actions/counter'
import TabBar from '../../components/TabBar/TabBar'
import './index.scss'

interface LoginInfo {
  data: {
    phoneNum: string;
    psw: string;
  },
  contentType?: string;
  hasMessage: boolean;
}

type PageStateProps = {
  shop: {
    shopList: ShopList[]
  },
  login
}

type PageDispatchProps = {
  getShopList: () => void;
  onLogin: (param: LoginInfo) => void;
}

type PageOwnProps = {
}

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

class Index extends Component<{}, PageState> {

  config: Config = {
    navigationBarTitleText: '主页',
  }
  
  state = {
    searchText: ''
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

  /**
   * @description 跳转到我的文档
   * @param {number} id
   * @memberof Index
   */
  handleToMyDocument(id: number, title: string, e) {
    e.stopPropagation()
    Taro.navigateTo({
      url:`../document/document?id=${id}&title=${encodeURI(title)}`
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
    const shopData = shopList.filter((item) => {
      if (searchText && searchText !== '') {
        return item.shopName.indexOf(searchText) > -1
      } else {
        return true
      }
    })
    
    

    const indexTop = (
      <View className='index-top'>
          <View className='index-top-row'>
            <Image className='index-icon' src={require('../../assets/images/index/magnifyingGlass.png')}></Image>
            <Input className='index-input' placeholder='请输入打印店名字' placeholderClass='index-inputPL' maxLength={40} onInput={this.handleInputSearch.bind(this)} value={searchText}></Input>
          </View>
          <Image className='index-icon' src={require('../../assets/images/index/scanQRCode.png')} onClick={this.handleScanQRCode.bind(this)}></Image>
        </View>
    )

    const items = shopData.map(item => {
      return (
        <View onClick={this.handleToShop.bind(this, item.shopId)} key={item.shopId} className='index-item'>
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
            <Button onClick={this.handleToMyDocument.bind(this, item.shopId, item.shopName)} className='index-item-button'>打印</Button>
          </View>
        </View>
      )
    })

    return (
      <View className='index'>
        {indexTop}
        {
          shopData && shopData.length > 0 ?
            <View className='index-content'>
              <Text className='index-title'>附近打印店</Text>
              <ScrollView className='index-list'>
                {items}
              </ScrollView>
            </View>
            :
            <BlankPage
              title='暂无相关打印店信息'
              picture={require('../../assets/images/index/blank-house.png')}
            />
        }
        {/* <Button className='nav' onClick={this.navTo.bind(this, 1)}>nav to login</Button>
        <Button className='nav' onClick={this.navTo.bind(this, 2)}>nav to bindWX</Button> */}
        <TabBar current={0} />
      </View>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>