/**
 * @desc 顶部导航栏
 */

 import Taro, { Component } from '@tarojs/taro'
 import { View, Image, Text } from '@tarojs/components'

 import './NavBar.scss'
 import backArrow from '../../assets/backArrow.png'

 type props = {
     title: string,
     handleBack: any
 }
 export default class NavBar extends Component<props> {


    render () {
        const test = 
        <View className='navBar'>
            <Image className='navImage' src={backArrow} onClick={this.props.handleBack}/>
            <Text className='navText'>{this.props.title}</Text>
        </View>
        return (
            <View>
                {test}
            </View>
        )
    }
 }
