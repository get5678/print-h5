/**
 * @desc 顶部导航栏
 */

 import Taro, { Component } from '@tarojs/taro'
 import { View, Image, Text } from '@tarojs/components'

 import './NavBar.scss'
 import back from '../../assets/backArrow.png'
 type props = {
     title: string,
     handleBack: any,
     backArrow?: string,
 }
 export default class NavBar extends Component<props> {


    render () {
        const { backArrow  } = this.props;
        const test = 
        <View className='navBar'>
                <View className='navBack' onClick={this.props.handleBack.bind(this)}>
                    <Image className='navImage' src={backArrow ? backArrow : back} />
                </View>
            <Text className='navText'>{this.props.title}</Text>
        </View>
        return (
            <View className='navBars'>
                {test}
            </View>
        )
    }
 }
