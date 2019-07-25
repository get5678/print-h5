import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Image, Input, Text } from '@tarojs/components'
import { Toast } from '../../components/toast/toast'
import { sendAuthCode, toBindPhone } from '../../utils/api'
// import { connect } from '@tarojs/redux'

import './bindPhone.scss'

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PageState = {
  phone: string;
  code: string;
  picture: string;
  showToast: boolean;
  buttonDisabled: boolean;
  codeButtonText: string;
  showWarn: boolean;
  warnText: string;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface BindPhone {
  props: IProps;
}

class BindPhone extends Component<{}, PageState> {
  config: Config = {
    navigationBarTitleText: '绑定手机'
  }

  constructor() {
    super()
    this.state = {
      phone: '',
      code: '',
      picture: '',
      showToast: false,
      buttonDisabled: false,
      codeButtonText: '发送验证码',
      showWarn: false,
      warnText: ''
    }
  }


  /**
   * @description 处理电话号码输入和验证码输入
   * @param {number} type 事件类型：1是电话号码，2是验证码
   * @param {object} e 获得事件
   * @memberof BindPhone
   */
  handlePhoneInput(type: number, e: { detail: { value: string } }) {
    if (type === 1) {
      this.setState({
        phone: e.detail.value
      }, () => {
        if (!isPhoneNumber(this.state.phone)) {
          this.setState({
            showWarn: true,
            warnText: '请输入正确的电话号码'
          })
        } else {
          this.setState({
            showWarn: false
          })
        }
      })
    } else if (type === 2) {
      this.setState({
        code: e.detail.value
      }, () => {
        if (!isPhoneNumber(this.state.phone)) {
          this.setState({
            showWarn: true,
            warnText: '请输入正确的电话号码'
          })
        } else if (this.state.code.length !== 6) {
          this.setState({
            showWarn: true,
            warnText: '请输入6位验证码'
          })
        } else {
          this.setState({
            showWarn: false,
            warnText: ''
          })
        }
      })
    }
  }

  /**
   * @description 点击发送验证码
   * @memberof BindPhone
   */
  async sendVerificationCode() {
    const phone = this.state.phone;
    if (!isPhoneNumber(phone)) {
      this.setState({
        showWarn: true,
        warnText: '请输入正确的电话号码'
      })
    } else {
      await sendAuthCode({
        phoneNum: phone
      }, null, true).then(res => {
        console.log(res)
        if (res.code === 1) {
          Taro.showToast({
            title: res.msg,
            icon: 'success',
            mask: true
          })
          this.countDown(60)
        } else {
          Taro.showToast({
            title: res.msg,
            icon: 'none',
            mask: true
          })
        }
      })
    }
  }

  /**
   * @description 提交登陆或者注册
   * @memberof BindPhone
   */
  async submitBindPhone() {
    const phone = this.state.phone;
    const code = this.state.code;
    if (!isPhoneNumber(phone)) {
      this.setState({
        showWarn: true,
        warnText: '请输入正确的电话号码'
      })
    } else if (code.length !== 6) {
      this.setState({
        showWarn: true,
        warnText: '请输入6位验证码'
      })
    } else {
      Taro.showToast({
        title: '提交中···',
        icon: 'loading',
        mask: true
      })
      await toBindPhone({
        phoneNum: phone,
        authCode: code
      }, null, true).then(res => {
        Taro.hideToast()
        if (res.code === 1) {
          this.setState({
            showToast: true
          })
        } else {
          Taro.showToast({
            title: res.msg,
            icon: 'none',
            mask: true
          })
        }
      })
    }
  }

  /**
   * @description 关闭toast
   * @memberof Toast
   */
  closeToast() {
    this.setState({
      showToast: false
    })
    Taro.redirectTo({
      url: '../index/index'
    })
  }

  /**
   * @description 验证码倒计时
   * @param time 倒计时秒数
   * @memberof BindPhone
   */
  countDown(time: number) {
    let timing = time;
    this.setState({
      codeButtonText: `${timing}s`,
      buttonDisabled: true
    })
    let timer = setInterval(() => {
      timing--;
      if (timing > 0) {
        this.setState({
          codeButtonText: `${timing}s`,
          buttonDisabled: true
        })
      } else {
        this.setState({
          codeButtonText: `发送验证码`,
          buttonDisabled: false
        })
        clearInterval(timer);
      }
    }, 1000)
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { codeButtonText, buttonDisabled, showToast, warnText, showWarn } = this.state;

    return (
      <View className='bind'>
        <View className='bind-card'>
          <Image className='bind-portrait' src='https://static.runoob.com/images/demo/demo1.jpg'></Image>
          <View className='bind-box'>
            <View className='bind-box-row'>
              <Image className='bind-icon bind-icon-phone' src={require('../../assets/images/bindPhone/bind-phone.png')}></Image>
              <Input name='phone' className='bind-input' placeholder='请输入手机号' type='number' maxLength={11} onInput={this.handlePhoneInput.bind(this, 1)}></Input>
            </View>
            <View className='bind-box-row'>
              <Image className='bind-icon bind-icon-code' src={require('../../assets/images/bindPhone/bind-verify.png')}></Image>
              <Input name='code' className='bind-input' placeholder='请输入验证码' placeholderClass='bind-inputPL' type='number' maxLength={6} onInput={this.handlePhoneInput.bind(this, 2)}></Input>
              <Button className={buttonDisabled ? 'bind-code bind-codeDisabled' : 'bind-code'} disabled={buttonDisabled ? true : false} onClick={this.sendVerificationCode.bind(this)}>{codeButtonText}</Button>
            </View>
            {showWarn ? <View className='bind-warn'>
              <Text>{warnText}</Text>
            </View> :
            ''}
          </View>
          <Button className='bind-button' onClick={this.submitBindPhone.bind(this)}>提交</Button>
        </View>
        {(!showToast) ? '' :
            <Toast
              picture={require('../../assets/images/bindPhone/bind-success.png')}
              title='绑定成功'
              confirm='我知道了'
              onConfirm={this.closeToast.bind(this)}
            />}
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endRegion

export default BindPhone as ComponentClass<PageOwnProps, PageState>

/**
 * @description 判断是否是电话号码
 * @param phone 传入的数字
 */
const isPhoneNumber = (phone: string) => {
  const reg = /^1[3|4|5|7|8][0-9]{9}$/;
  return reg.test(phone);
}