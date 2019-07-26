import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import TabBar from '../../components/TabBar/TabBar'

import headPic from './pic/headPic.png'
import feedback from './pic/feedback.png'
import myorder from './pic/myorder.png'
import mydoc from './pic/mydoc.png'
import aboutus from './pic/aboutus.png'
import arrow from '../../assets/arrow.png'

import './mine.scss'

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Mine {
    props: IProps;
}

class Mine extends Component {

    config: Config = {
        navigationBarTitleText: '我的',
        navigationBarBackgroundColor: '#31c0cb'
    }

    componentWillMount() {
        const token = Taro.getStorageSync('token');
        if (token === '') {
            this.setState({
                phone: '请绑定手机号'
            })
        }
       
    }

    state = {
        name: '小邮',
        phone: 1576668888,
        lists: [
            { id: 0, img: mydoc, title: '我的文档' },
            { id: 1, img: myorder, title: '我的订单' },
            { id: 2, img: feedback, title: '我的反馈' },
            { id: 3, img: aboutus, title: '关于我们' },
            { id: 4, img: aboutus, title: '注册/登录' }
        ]
    }

    handleClick = (id) => {
        switch(id) {
          case 0:
            Taro.redirectTo({
                url:'/pages/document/document'
            }) 
            break;
          case 1:
            Taro.redirectTo({
                url: '/pages/historyorder/historyorder'
            })
            break;
           case 2:
            Taro.redirectTo({
                url:'/pages/feedback/feedback'
            })
            break;
          case 3:
            Taro.redirectTo({
                url:'/'
            })
            break;
          case 4:
            Taro.redirectTo({
                url:'/pages/bindPhone/bindPhone'
            })
            break;
          default:
            break;
        }
    }

    handleToBindphone = () => {
        if(typeof(this.state.phone) !== 'number') {
            Taro.redirectTo({
                url: '../bindPhone/bindPhone'
            })
        }
    }

    render() {
        const { lists } = this.state;

        const InfoLists =  (
            <View className='mineList'>
                {lists.map((list) => 
                    <View key={list.id} className='infoList' onClick={this.handleClick.bind(this,list.id)}>
                        <Image className='listImg' src={list.img} />
                        <Text className='listText'>{list.title}</Text>
                        <Image className='arrow' src={arrow} />
                    </View>)}
            </View>
        )
        return (
            <View className='myPage'>
                <View className='mine'>
                    <View className='mineContent'>
                        <View className='contentHeadpic'>                    
                            <Image src={headPic} className='headPic'/>
                            <Text className='headName'>{this.state.name}</Text>
                            <Text className='headPhone' onClick={this.handleToBindphone.bind(this)}>{this.state.phone}</Text>
                        </View>             
                        {InfoLists}
                    </View>
                </View>
                <TabBar current={2}/>
            </View>
        )
    }
}

export default Mine as ComponentClass<PageOwnProps, PageState>