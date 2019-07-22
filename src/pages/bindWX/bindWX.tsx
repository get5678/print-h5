import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Image, Text } from '@tarojs/components'

import './bindWX.scss'

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PageState = {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface BindWX {
  props: IProps;
}

class BindWX extends Component<{}, PageState> {
  config: Config = {
    navigationBarTitleText: '绑定手机'
  }

  constructor() {
    super()
    this.state = {
    }
  }

  onLoginByWeapp = (e) => {
    e.stopPropagation();
    
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='bindWX'>
        <Image className='bindWX-image' src={require('../../assets/images/bindWX/bindWX.png')}></Image>
        <Text className='bindWX-title'>绑定后才可“查看”和“访问”哦</Text>
        <Button className='bindWX-button' onClick={this.onLoginByWeapp.bind(this)}>绑定微信</Button>
      </View>
    )
  }
}

export default BindWX as ComponentClass<PageOwnProps, PageState>