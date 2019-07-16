import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Input, Image } from '@tarojs/components'
import { BlankPage } from '../../components/blankPage/blankPage'
// import { connect } from '@tarojs/redux'
// import { add, minus, asyncAdd } from '../../actions/counter'
import TabBar from '../../components/TabBar/TabBar'
import './index.scss'

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PageState = {
  searchText: string;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Component<{}, PageState> {

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
    console.log(e.detail.value)
    this.setState({
      searchText: e.detail.value
    })
  }

  /**
   * @description 处理扫二维码
   * @memberof Index
   */
  handleScanQRCode() {
    console.log('暂未开放');
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { searchText } = this.state;

    return (
      <View className='index'>
        <View className='index-top'>
          <View className='index-top-row'>
            <Image className='index-icon' src={require('../../assets/images/index/magnifyingGlass.png')}></Image>
            <Input className='index-input' placeholder='请输入打印店名字' placeholderClass='index-inputPL' maxLength={40} onInput={this.handleInputSearch.bind(this)} value={searchText}></Input>
          </View>
          <Image className='index-icon' src={require('../../assets/images/index/scanQRCode.png')} onClick={this.handleScanQRCode.bind(this)}></Image>
        </View>
        <Button className='nav' onClick={this.navTo.bind(this, 1)}>nav to login</Button>
        <Button className='nav' onClick={this.navTo.bind(this, 2)}>nav to bindWX</Button>
        {/* <BlankPage
          title='暂无打印店相关信息'
          picture={require('../../assets/images/index/blank-house.png')}
        /> */}
        <TabBar current={0} />
      </View>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>
