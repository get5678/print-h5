
/**
 * @desc 底部切换
 */
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtTabBar } from 'taro-ui'

import index from '../../assets/index.png';
import selected_index from '../../assets/selected_index.png';
import order from '../../assets/order.png';
import selected_order from '../../assets/selected_order.png';
import mine from '../../assets/mine.png';
import selected_mine from '../../assets/selected_mine.png'

import './TabBar.scss'
type props = {
    current: number
}
export default class TabBar extends Component<props> {
    
    state = {
        lists: [
            { title: '首页', image: index, selectedImage: selected_index },
            { title: '订单', image: order, selectedImage: selected_order },
            { title: '我的', image: mine, selectedImage: selected_mine }
        ]
    }

    handleClick = (e) => {
        this.setState({
            current: e
        })
        switch(e) {
          case 0:
            Taro.redirectTo({
                url: '/pages/index/index'
            })
            break;
          case 1:
            Taro.redirectTo({
                url: '/pages/noworder/noworder'
            })
            break;
          case 2:
            Taro.navigateTo({
                url: '/pages/mine/mine'
            })
            break;

          default:
            break;

        }
    }

    render() {
        return (
            <View>
                <AtTabBar
                    tabList={this.state.lists}
                    onClick={this.handleClick.bind(this)}
                    current={this.props.current}
                    fixed
                    color='#888'
                    selectedColor="#000"
                    iconSize={20}
                />
            </View>
        )
    }

}