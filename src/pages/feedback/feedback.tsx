import { ComponentClass } from 'react'
import Taro, {Config } from '@tarojs/taro'
import { View, Image, Textarea} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import return2Png from '../../assets/return2.png';
import { asynFeedBack } from '../../actions/feedBack'

import './feedback.scss'
import no from '../../assets/no.png';
import fine from '../../assets/fine.png';
import ok from '../../assets/ok.png';
import no1 from '../../assets/no1.png';
import fine1 from '../../../.temp/assets/fine1.png';
import ok1 from '../../../.temp/assets/ok1.png';
import { Toast } from '../../components/toast/toast';

type PageStateProps = {
  feedBack: any
}

type PageDispatchProps = {
  asynFeedBack: ()=> any,
  feedback: (payload)=> any
}

type PageOwnProps = {}

type PageState = {
  justIcon: number,
  inputValue: string,
  flag: boolean 
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Feedback {
  props: IProps;
}

@connect(({ feedBack }) => ({
  feedBack
}), (dispatch) => ({
  feedback (payload) {
    dispatch(asynFeedBack(payload))
  },
}))

class Feedback extends Taro.Component<{}, PageState> {
  constructor(props){
    super(props);
    this.state={
      justIcon:2,
      inputValue: '',
      flag:false;
    }
  }
    config: Config = {
    navigationBarTitleText: '反馈页面'
  }

GotoFeedback(inputValue,justIcon){
  console.log(inputValue)
  if(inputValue){
    this.props.feedback({
      content: inputValue,
      score: justIcon
    });

    this.setState({
      flag:true
    })
  } else{
    alert('评价不能为空')
  }
}

Return(){
    Taro.navigateTo({
        url:'../mine/mine'
    })
}
onInput = e => {
  this.setState({
    inputValue: e.detail.value
  })
}
Icon(this,Icon,e){
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
    
    const box = this.state.flag?(<Toast
        picture={require('../../assets/images/bindPhone/bind-success.png')}
        title='反馈成功'
        confirm='我知道了'
        onConfirm={this.Return.bind(this)}
/>):null
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
            <Image onClick={this.Icon.bind(this, 0)} className='just-icon' src={justIcon==0?no1:no}/>
            <Image onClick={this.Icon.bind(this, 1)} className='just-icon' src={justIcon==1?fine1:fine}/>
            <Image onClick={this.Icon.bind(this, 2)} className='just-icon' src={justIcon==2?ok1:ok}/>
        </View>
        <View className='button-box'>
          <View className='button' onClick={this.GotoFeedback.bind(this,inputValue,justIcon)}>提交</View>
        </View>
        {box}
      </View>
    )
  }
}

export default Feedback as ComponentClass<PageOwnProps, PageState>
