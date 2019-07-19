import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Image, Text, Icon, Button } from '@tarojs/components'
import NavaBar from '../../components/NavBar/NavBar'
import shopData from '../../pages/index/index_data'

import './chooseShop.scss'

type PageStateProps = {

}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface  ChooseShop {
    props: IProps;
}

class ChooseShop extends Component<IProps, PageState> {

    config: Config = {
        navigationBarTitleText: '选择打印店',
    }

    handleBack = () => {
        Taro.navigateBack({
            delta:1
        })
    }

    handleChooseShop = (index) => {
        this.setState({
            shopId: index,
        })
    }

    handleNext = () => {
        const {shopId} = this.state;
        let title = '';
        shopData.map((item,index) => {
            if (shopId === index) {
                title = item.title
            }
        })
        Taro.navigateTo({
            url: `../../pages/document/document?id=${shopId}&title=${encodeURI(title)}`
        })
    }

    state = {
        shopId: 0,
    }

    render () {
        
        const items = shopData.map((item, index) => {
            return (
                <View className='index-item' onClick={this.handleChooseShop.bind(this,index)}>
                    <Image className='index-item-image' src={item.picture}></Image>
                    <View className='index-item-column'>
                        <View className='index-item-title'>
                            <Text className='index-item-shopname'> {item.title}</Text>
                            <Text className='index-item-price'>{item.price}/张</Text>
                        </View>
                        <Text className='index-item-address'>
                            <Image className='index-item-address-icon' src={require('../../assets/images/index/address.png')}></Image>
                            {item.address}
                        </Text>
                    </View>
                    <View className='index-item-column'>
                        <Icon className={`${this.state.shopId === index  ? 'index-item-button' : 'gary' }`} size='20' type='success'  />
                    </View>
                </View>
            )
        })

        const buttons = (
            <View className='bottomButtons'>
                <Button className='bottomButtons-back bottomButtons-item' onClick={this.handleBack.bind(this)}>
                    返回
                </Button>
                <Button className='bottomButtons-next bottomButtons-item' onClick={this.handleNext.bind(this)}>
                    下一步
                </Button>
            </View>
        )

        return (
            <View>
                <NavaBar
                    title='选择打印店'
                    handleBack={this.handleBack.bind(this)}
                />
                
                <ScrollView scrollY className='index'>
                    {items}
                </ScrollView>
                {buttons}
            </View>

            
        )
    }

}

export default ChooseShop as ComponentClass<PageOwnProps, PageState>