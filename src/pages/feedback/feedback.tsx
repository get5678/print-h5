import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Textarea} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import return2Png from '../../assets/return2.png';


import { add, minus, asyncAdd } from '../../actions/counter'

import './feedback.scss'
import no from '../../assets/no.png';
import fine from '../../assets/fine.png';
import ok from '../../assets/ok.png';
import no1 from '../../assets/no1.png';
import fine1 from '../../../.temp/assets/fine1.png';
import ok1 from '../../../.temp/assets/ok1.png';

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface State {
  justIcon: string,
  inputValue: string
}

interface Feedback {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Feedback extends Taro.Component<{}, State> {
  constructor(props){
    super(props);
    this.state={
      justIcon:'',
      inputValue: ''
    }
  }
    config: Config = {
    navigationBarTitleText: '首页'
  }

GotoFeedback(inputValue,justIcon){
  console.log("这里是提交内容"+inputValue,justIcon)
    // Taro.navigateTo({
    //     url:'../'
    // })
}

Return(){
    Taro.navigateTo({
        url:'../mine/mine'
    })
}
onInput = e => {
  console.log(e.detail.value)
  this.setState({
    inputValue: e.detail.value
  })
}
Icon(this,Icon,e){
  console.log(this,Icon,e);
  this.setState({
    justIcon:Icon
  })
}
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {justIcon,inputValue} = this.state;
    return (
      <View>
        <View className='top-box'>
          <Image onClick={this.Return} className='return' src={return2Png}></Image>
          <View className='top-tittle'>我的反馈</View>
        </View>
          <Textarea onInput={this.onInput.bind(this)} className='input-feedback' value={inputValue} placeholderClass='placeholder' placeholder='请输入您宝贵的意见和建议!'/>
        <View className='score-box'>
          <View className='line'></View>
          请为我们打分
          <View className='line'></View>
        </View>
        <View className='just'>
            <Image onClick={this.Icon.bind(this, "no1")} className='just-icon' src={justIcon=="no1"?no1:no}/>
            <Image onClick={this.Icon.bind(this, "fine1")} className='just-icon' src={justIcon=="fine1"?fine1:fine}/>
            <Image onClick={this.Icon.bind(this, "ok1")} className='just-icon' src={justIcon=="ok1"?ok1:ok}/>
        </View>
        <View className='button-box'>
          <View className='button' onClick={this.GotoFeedback.bind(this,inputValue,justIcon)}>提交</View>
        </View>
      </View>
    )
  }
}

export default Feedback as ComponentClass<PageOwnProps, PageState>
