import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Image, Text, Icon, Button } from '@tarojs/components'
import NavaBar from '../../components/NavBar/NavBar'

import { connect } from '@tarojs/redux'
import { asyncGetShopList } from '../../actions/shop'

import './chooseShop.scss'

type PageStateProps = {
    shop: {
        shopList: any
    }
}

type PageDispatchProps = {
    getShopList: (payload?) => any;
}

type PageOwnProps = {}

type PageState = {
    shopId: number;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface  ChooseShop {
    props: IProps;
}
@connect(
    ({ shop } ) => ({
        shop
    }), (dispatch) => ({
        getShopList(params) {
            dispatch(asyncGetShopList(params));
        }
    })
)
class ChooseShop extends Component<IProps, PageState> {

    config: Config = {
        navigationBarTitleText: '选择打印店',
    }

    constructor(props) {
        super(props);

        this.state = {
            shopId: 0,
        }
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
        const { shopList } = this.props.shop;
        let title = '';
        shopList.map((item,index) => {
            if (shopId === index) {
                title = item.shopName
            }
        })
        Taro.navigateTo({
            url: `../document/document?id=${shopId}&title=${encodeURI(title)}`
        })
    }

    componentDidMount() {
        this.props.getShopList();
    }

    componentDidUpdate() {
    }

    render () {
        const{ shopList } = this.props.shop;
        const shopData = shopList ? shopList : [] ;

        const items = shopData.map((item, index) => {
            return (
                <View className='index-item' onClick={this.handleChooseShop.bind(this,index)}>
                    <Image className='index-item-image' src={item.shopAvatar}></Image>
                    <View className='index-item-column'>
                        <View className='index-item-title'>
                            <Text className='index-item-shopname'> {item.shopName}</Text>
                            <Text className='index-item-price'>{item.shopPrice}/张</Text>
                        </View>
                        <Text className='index-item-address'>
                            <Image className='index-item-address-icon' src={require('../../assets/images/index/address.png')}></Image>
                            {item.shopAddress}
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