import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { ITouchEvent } from '@tarojs/components/types/common';

import './toast.scss'

interface IProps {
  picture: string;
  title: string;
  button: string;
  onShow: (event: ITouchEvent) => void,
}

/**
 * @description 消息弹出框组件
 * @class Toast
 * @extends {Component<IProps, {}>}
 */
class Toast extends Component<IProps, {}> {
  toShow() {
    return this.props.onShow
  }

  render () {
    const { picture, title, button, onShow } = this.props

    return (
      <View className='toast'>
        <Image className='toast-picture' src={picture} />
        <Text className='toast-title'>{title}</Text>
        <View className='toast-line'></View>
        <Button className='toast-button' onClick={onShow}>{button}</Button>
      </View>
    )
  }
}

export { Toast }