import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker, } from '@tarojs/components'

import NavBar from '../../components/NavBar/NavBar'
import backArrow from '../../assets/backArrow.png'
import './uploadFile.scss'


type PageStateProps = {
    printList: (string[] | number[])[];
    selectedprintList: (any)[];
    preprint: number[];
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

    state = {
        printList: [
            ['A3', 'A4', 'B4', 'B5'],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            ['单面', '双面'],
            ['黑白', '彩色']
        ],
        selectedprintList: ['A4', 1, '单面', '黑白'],
        preprint: [1, 0, 0, 0],
    }

    handleBack = () => {
        Taro.redirectTo({
            url: '../../pages/document/document'
        })
    }

    render() {
        const { printList, preprint } = this.state;
        return (
            <View className='myUpload'>
                <NavBar backArrow={backArrow} title='' handleBack={this.handleBack} />
                <Picker 
                mode='multiSelector' range={printList}  value={preprint}

                >
                    <text>test</text>
                </Picker>
            </View>
        )
    }

}
export default UploadFile as ComponentClass<PageOwnProps, PageState>