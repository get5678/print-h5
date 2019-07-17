import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Image, Text, Button, } from '@tarojs/components'

import NavBar from '../../components/NavBar/NavBar'
import backArrow from '../../assets/backArrow.png'
import './uploadFile.scss'


type PageStateProps = {
}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {

}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface UploadFile {
    props: IProps;
}

class UploadFile extends Component<IProps, PageState> {
    config: Config = {
        navigationBarTitleText: '上传文件'
    }

    handleBack = () => {
        Taro.redirectTo({
            url: '../../pages/document/document'
        })
    }

    render() {
        return (
            <View className='myUpload'>
                <NavBar backArrow={backArrow} title='' handleBack={this.handleBack} />
                test
            </View>
        )
    }

}
export default UploadFile as ComponentClass<PageOwnProps, PageState>