import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { ITouchEvent } from '@tarojs/components/types/common';

import './toast.scss'

/**
 * @props picture 顶部图片
 * @props title 主标题
 * @props confirm 按钮文字
 * @props subTitle 副标题，会影响主标题展现形式
 * @props model 是否是双按钮模式
 * @props onConfirm 调用父元素按钮点击事件
 * @props onCancel 调用点击事件2
 * @props cancel 双按钮第二个按钮文字
 * @interface IProps
 */
interface IProps {
  picture: string;
  title: string;
  confirm: string;
  subTitle?: string;
  model?: boolean;
  cancel?: string;
  onConfirm?: (event: ITouchEvent) => void,
  onCancel?: (event: ITouchEvent) => void
}

/**
 * @description 消息弹出框组件
 * @class Toast
 * @extends {Component<IProps, {}>}
 */
class Toast extends Component<IProps, {}> {
  toShow() {
    return this.props.onConfirm
  }

  render() {
    const { picture, title, confirm, onConfirm, onCancel, subTitle, model, cancel } = this.props

    return (
      <View className='toast-mask'>
        <View className='toast'>
          <Image className='toast-picture' src={picture} />
          {
            subTitle ? 
            <View className='toast-box'>
              <Text className='toast-title'>{title}</Text>
              <Text className='toast-subTitle'>{subTitle}</Text>
            </View>
             :
            <Text className='toast-title'>{title}</Text>
          }
          <View className='toast-line'></View>
          {
            model ? 
            <View className='toast-buttons'>
              <Button className='toast-confirm' onClick={onConfirm}>{confirm}</Button>
              <Button className='toast-cancel' onClick={onCancel}>{cancel}</Button>
            </View> 
            :
            <Button className='toast-button' onClick={onConfirm}>{confirm}</Button>
          }
        </View>
      </View>
    )
  }
}

export { Toast }