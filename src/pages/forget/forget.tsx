import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Image, Input, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { Toast } from '../../components/toast/toast'
import { changePsw, toLogin, sendAuthCode } from '../../utils/api'
import return2Png from '../../assets/backArrow.png';

import './forget.scss'

type LoginInfo = {
  phoneNum: string;
  psw: string;
}

type PageStateProps = {
  login: {}
}

type PageDispatchProps = {
  onLogin: (param: LoginInfo) => void;
}

type PageOwnProps = {}

type PageState = {
  phone: string;
  code: string;
  picture: string;
  showToast: boolean;
  toastText: string;
  buttonDisabled: boolean;
  codeButtonText: string;
  showWarn: boolean;
  warnText: string;
  password: string;
  passwordConfirm: string;
  current: number;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Forget {
  props: IProps;
}

class Forget extends Component<{}, PageState> {
  config: Config = {
    navigationBarTitleText: '绑定手机'
  }

  constructor () {
    super(...arguments)
  }

  state = {
    current: 0,
    phone: '',
    code: '',
    picture: '',
    showToast: false,
    toastText: '注册成功',
    buttonDisabled: false,
    codeButtonText: '发送验证码',
    showWarn: false,
    warnText: '',
    password: '',
    passwordConfirm: ''
  }

  /**
   * @description 处理电话号码输入和验证码输入
   * @param {number} type 事件类型：1是电话号码，2是验证码，3是验证密码，4是确认密码
   * @param {object} e 获得事件
   * @memberof Forget
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
        } else if (!isSafePassword(this.state.password) || !isSafePassword(this.state.passwordConfirm)) {
          this.setState({
            showWarn: true,
            warnText: '密码至少是6位并且包含大小写字母'
          })
        } else if (this.state.passwordConfirm !== this.state.password) {
          this.setState({
            showWarn: true,
            warnText: '两次输入的密码不同'
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
    } else if (type === 3) {
      this.setState({
        password: e.detail.value
      }, () => {
        if (!isPhoneNumber(this.state.phone)) {
          this.setState({
            showWarn: true,
            warnText: '请输入正确的电话号码'
          })
        } else if (!isSafePassword(this.state.password)) {
          this.setState({
            showWarn: true,
            warnText: '密码至少是6位并且包含大小写字母'
          })
        } else if (this.state.passwordConfirm !== '' && this.state.passwordConfirm !== this.state.password) {
          this.setState({
            showWarn: true,
            warnText: '两次输入的密码不同'
          })
        } else {
          this.setState({
            showWarn: false,
            warnText: ''
          })
        }
      })
    } else if (type === 4) {
      this.setState({
        passwordConfirm: e.detail.value
      }, () => {
        if (!isPhoneNumber(this.state.phone)) {
          this.setState({
            showWarn: true,
            warnText: '请输入正确的电话号码'
          })
        } else if (!isSafePassword(this.state.password) || !isSafePassword(this.state.passwordConfirm)) {
          this.setState({
            showWarn: true,
            warnText: '密码至少是6位并且包含大小写字母'
          })
        } else if (this.state.passwordConfirm !== this.state.password) {
          this.setState({
            showWarn: true,
            warnText: '两次输入的密码不同'
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
   * @description 修改密码
   * @memberof Forget
   */
  async submitBindPhone() {
    const phone = this.state.phone
    const code = this.state.code
    const password = this.state.password
    const passwordConfirm = this.state.passwordConfirm
    if (!isPhoneNumber(phone)) {
      this.setState({
        showWarn: true,
        warnText: '请输入正确的电话号码'
      })
    } else if (!isSafePassword(password)) {
      this.setState({
        showWarn: true,
        warnText: '密码至少是6位并且包含大小写字母'
      })
    } else if (!isSafePassword(passwordConfirm)) {
      this.setState({
        showWarn: true,
        warnText: '密码至少是6位并且包含大小写字母'
      })
    } else if (passwordConfirm !== password) {
      this.setState({
        showWarn: true,
        warnText: '两次输入的密码不同'
      })
    } else if (code.length !== 6) {
      this.setState({
        showWarn: true,
        warnText: '请输入6位验证码'
      })
    } else {
      // 清除token
      Taro.clearStorageSync()
      Taro.showLoading({
        title: '提交中···',
        mask: true
      })
      await changePsw({
        phoneNum: phone,
        authCode: code,
        psw: password
      }, null, true).then(async res => {
        Taro.hideLoading()
        if (res.code === 1) {
          this.setState({
            toastText: '注册成功',
            showToast: true
          })
          // 登录
          const res = await toLogin({
            phoneNum: phone,
            psw: password
          }, null, true)
          // 存入storage
          if (res.code === 1) {
            Taro.setStorageSync('token', res.data.token)
            delete res.data.token
            Taro.setStorageSync('userInfo', res.data)
            this.setState({
              toastText: '登录成功',
              showToast: true
            })
            const that = this
            // 3s回首页
            setTimeout(() => {
              that.clearAll()
              Taro.redirectTo({
                url: '../index/index'
              })
            }, 3000)
          } else {
            Taro.showToast({
              title: res.msg,
              icon: 'none',
              mask: true
            })
          }
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
   * @description 清空数据
   * @memberof BindPhone
   */
  clearAll () {
    this.setState({
      phone: '',
      code: '',
      picture: '',
      showWarn: false,
      warnText: '',
      password: '',
      passwordConfirm: ''
    })
  }

  /**
   * @description 点击发送验证码
   * @memberof BindPhone
   */
  async sendVerificationCode() {
    const phone = this.state.phone;
    const password = this.state.password
    const passwordConfirm = this.state.passwordConfirm
    if (!isPhoneNumber(phone)) {
      this.setState({
        showWarn: true,
        warnText: '请输入正确的电话号码'
      })
    } else if (!isSafePassword(password) && !isSafePassword(passwordConfirm)){
      this.setState({
        showWarn: true,
        warnText: '密码至少是6位并且包含大小写字母'
      })
    } else if (password !== passwordConfirm) {
      this.setState({
        showWarn: true,
        warnText: '两次输入的密码不同'
      })
    } else {
      await sendAuthCode({
        phoneNum: phone,
        flag: 0
      }, null, true).then(res => {
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
   * @description 切换选项卡
   * @param {number} value
   * @memberof Forget
   */
  handleClick (value: number) {
    this.setState({
      current: value,
      showWarn: false,
      warnText: '',
    })
  }

  // 回退
  back() {
    Taro.navigateBack({
      delta: 1
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
    // 检测token，有就跳回去
  }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { codeButtonText, buttonDisabled, showToast, toastText, warnText, showWarn } = this.state;


    const topBar = (
      <View className='forget-top'>
        <View className="forget-top-wrapper" onClick={this.back.bind(this)}>
          <Image className='forget-top-return' src={return2Png}></Image>
        </View>
        <View className='forget-top-title'>修改密码</View>
      </View>
    )

    const tabList = [{ title: '修改密码' }]

    const login = (
      <View className='forget-box'>
        <View className='forget-box-row'>
          <Image className='forget-icon forget-icon-phone' src={require('../../assets/images/bindPhone/bind-phone.png')}></Image>
          <Input name='phone' className='forget-input' placeholder='请输入手机号' placeholderClass="forget-inputPL" type='number' maxLength={11} onInput={this.handlePhoneInput.bind(this, 1)}></Input>
        </View>
        <View className='forget-box-row'>
          <Image className='forget-icon forget-icon-password' src={require('../../assets/images/bindPhone/password.png')}></Image>
          <Input name='password' className='forget-input' placeholder='请输入新密码' placeholderClass="forget-inputPL" maxLength={16} password onInput={this.handlePhoneInput.bind(this, 3)}></Input>
        </View>
        <View className='forget-box-row'>
          <View className='forget-icon forget-icon-password'></View>
          <Input name='password' className='forget-input' placeholder='请再次输入新密码' placeholderClass="forget-inputPL" maxLength={16} password onInput={this.handlePhoneInput.bind(this, 4)}></Input>
        </View>
        <View className='forget-box-row'>
          <Image className='forget-icon forget-icon-code' src={require('../../assets/images/bindPhone/bind-verify.png')}></Image>
          <Input name='code' className='forget-input' placeholder='请输入验证码' placeholderClass="forget-inputPL" type='number' maxLength={6} onInput={this.handlePhoneInput.bind(this, 2)}></Input>
          <Button className={buttonDisabled ? 'forget-code forget-codeDisabled' : 'forget-code'} disabled={buttonDisabled ? true : false} onClick={this.sendVerificationCode.bind(this)}>{codeButtonText}>{codeButtonText}</Button>
        </View>
        {showWarn ? <View className='forget-warn'>
          <Text>{warnText}</Text>
        </View> :
        ''}
      </View>
    )

    return (
      <View className='forget'>
        {topBar}
        <View className='forget-card'>
          <Image className='forget-portrait' src='https://static.runoob.com/images/demo/demo1.jpg'></Image>
          <AtTabs className='forget-tabs' swipeable={false} current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            {login}
          </AtTabsPane>
        </AtTabs>
        <Button className='forget-button' onClick={this.submitBindPhone.bind(this)}>提交修改</Button>
        </View>
        {(!showToast) ? '' :
            <Toast
              picture={require('../../assets/images/bindPhone/bind-success.png')}
              title={toastText}
              subTitle='3s后跳回首页'
              confirm='我知道了'
              onConfirm={this.closeToast.bind(this)}
            />}
      </View>
    )
  }
}

export default Forget as ComponentClass<PageOwnProps, PageState>

/**
 * @description 判断是否是电话号码
 * @param phone 传入的数字
 */
const isPhoneNumber = (phone: string) => {
  const reg = /^1[3|4|5|7|8][0-9]{9}$/;
  return reg.test(phone);
}

/**
 * @description 判断密码是否安全，要求 6-16位，包含
 * @param password 
 * @returns {boolean}
 */
const isSafePassword = (password: string) => {
  const reg = /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,}).*$/
  return reg.test(password);
}