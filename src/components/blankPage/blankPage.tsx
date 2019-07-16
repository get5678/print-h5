import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import './blankPage.scss'

interface IProps {
  picture: string;
  title: string;
}

/**
 * @description 空白页组件
 * @class BlankPage
 * @extends {Component<IProps, {}>}
 */
class BlankPage extends Component<IProps, {}> {
  render () {
    const { picture, title } = this.props

    return (
      <View className='blank'>
        <Image className='blank-picture' src={picture} />
        <Text className='blank-title'>{title}</Text>
      </View>
    )
  }
}

export { BlankPage }