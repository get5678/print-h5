import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
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

    componentDidMount() {
        // Taro.setNavigationBarColor: '#31c0cb'
    }

    state = {
        name: '小邮',
        phone: 1576668888,
        lists: [
            { id: 0, img: mydoc, title: '我的文档' },
            { id: 1, img: myorder, title: '我的订单' },
            { id: 2, img: feedback, title: '我的反馈' },
            { id: 3, img: aboutus, title: '关于我们' }
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
                url: '/'
            })
            break;
          case 3:
            Taro.redirectTo({
                url:'/'
            })
            break;
          default:
            break;
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
            <View>
                <View className='mine'>
                    <View className='mineTop'></View>
                    {/* <View className='nav'>
                        我的
                    </View> */}
                    <View className='mineContent'>
                        <View className='contentHeadpic'>                    
                            <Image src={headPic} className='headPic'/>
                            <Text className='headName'>{this.state.name}</Text>
                            <Text className='headPhone'>{this.state.phone}</Text>
                        </View>
                        <View className='mineLists'>
                            {InfoLists}
                        </View>
                    </View>
                </View>
                <TabBar current={2}/>
            </View>
        )
    }
}

export default Mine as ComponentClass<PageOwnProps, PageState>