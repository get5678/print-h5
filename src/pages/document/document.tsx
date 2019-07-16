import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Image, Text, Button, Picker } from '@tarojs/components'

import NavBar from '../../components/NavBar/NavBar'

import './document.scss'
import word from './pic/word.png'
import pdf from './pic/pdf.png'
import ppt from './pic/ppt.png'
import question from './pic/question.png'
import unkown from './pic/unknown.png'
import list from './pic/list.png'
import close from './pic/close.png'
import arrow from '../../assets/arrow.png'


type list = {
    id: number;
    title: string;
    time: string;
    size: string;
    img: string;
    checked?: boolean;
}[];

type PageStateProps = {
}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {
    Lists: {
        id: number;
        title: string;
        time: string;
        size: string;
        img: string;
        checked?: boolean;
    }[];
    current: number;
    selected: boolean;
    shop: string;
    multiSelect: {
        size: string[];
        pagenum: number[];
        direction: string[];
        colors: string[];
    }[];
    show: boolean;
    printList: (string[] | number[] | any[])[];
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Document {
    props: IProps;
    title: string,

}

class Document extends Component<IProps, PageState> {

    config: Config = {
        navigationBarTitleText: '我的文档'
    }


    constructor(IProps) {
        super(IProps);
        this.handleBack = this.handleBack.bind(this);

    }

    state = {
        Lists:  [
            { id: 0, title: '期末资料.ppt', time: '2分钟前', size: '1.20MB', img: ppt },
            { id: 1, title: '毕业论文.pdf', time: '1分钟前', size: '5.27MB', img: pdf },
            { id: 2, title: '动画.docx', time: '1分钟前', size: '188.66KB', img: word },
            { id: 3, title: '其他', time: '1天前', size: '122.43KB', img: list },
            { id: 4, title: '未知', time: '2小时前', size: '323.34KB', img: unkown },
            { id: 5, title: '问题', time: '40分钟前', size: '2.3GB', img: question },
            { id: 6, title: '期末资料.ppt', time: '2分钟前', size: '1.20MB', img: ppt },
            { id: 7, title: '期末资料.ppt', time: '2分钟前', size: '1.20MB', img: ppt },
            { id: 8, title: '期末资料.ppt', time: '2分钟前', size: '1.20MB', img: ppt },
        ],
        current: -1,
        selected: false,
        shop: '阳光图文打印店',
        multiSelect: [
            {
                size: ['A1', 'A2', 'A3', 'A4'],
                pagenum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                direction: ['单面', '双面'],
                colors: ['彩色', '黑白']
            }],
        show: false,
        printList: [
            ['A1', 'A2', 'A3', 'A4'],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            ['单面', '双面'],
            ['彩色', '黑白']
        ],
    }

    handleBack = () => {
        Taro.redirectTo({
            url: '../../pages/mine/mine'
        })
    }

    handleChoose = (id: number) => {
        const { Lists } = this.state;
        let ListsAnother: list = Object.assign({},Lists);
        let ListArray :any = [];
        for (let i in ListsAnother) {
            ListArray.push(ListsAnother[i])
        }
        
        ListArray[id].checked = !ListArray[id].checked;
        this.setState({
            Lists: ListArray
        })
    }

    handlePrint = (): void => {
        this.setState({
            show: !this.state.show
        })
    }

    componentWillMount() {
        let { Lists } = this.state;
        let ListsAnother: list = [];
        Lists.map((item) => {
            ListsAnother.push(Object.assign({}, item, { checked: false }))
        });
        this.setState({
            Lists: ListsAnother
        })
    }

    render() {

        const { Lists, shop, multiSelect, show, printList, selectedPrintList } = this.state;
        
        const documentLists = (
            <View>
                {Lists.map((list, index) => (
                    <View key={list.id} className='docuList' onClick={this.handleChoose.bind(this, index)}>
                        <View className='docuBefore' style={{ background: `${list.checked ? '#2fb9c3' : ''}` }}></View>
                        <Image src={list.img} className='docuImg' />
                        <View className='docuContent'>
                            <Text className='docuTitle'>{list.title}</Text>
                            <View className='docuText'>
                                <Text className='docuSize'>{list.size}</Text>
                                <Text>{list.time}</Text>
                            </View>
                        </View>
                        <Image src={arrow} className='arrowright' />
                    </View>))}
            </View>
        )

        const bottomButton = (
            <View className='buttonDoc'>
                <Button className='uploadDoc buttDoc'>上传文件</Button>
                <Button className='printDoc buttDoc' onClick={this.handlePrint}>打印</Button>
            </View>
        )

        const printWindow = (
            <View className='printWindowAll cover' >
                <View className='printWindow'>
                    <View className='printShop'>打印店铺：{shop}
                        <Image src={close} className='printClose' onClick={this.handlePrint} />
                    </View>
                    <View className='multAll'>
                        {
                            multiSelect.map((mult) =>
                                <View className='multAll'>
                                    <View className='multSize mul'>{mult.size.map((size) => <View className='mulis'>{size}</View>)}</View>
                                    <View className='multNum mul'>{mult.pagenum.map((size) => <View className='mulis'>{size}</View>)}</View>
                                    <View className='multDirection mul'>{mult.direction.map((size) => <View className='mulis'>{size}</View>)}</View>
                                    <View className='multColor mul'>{mult.colors.map((size) => <View className='mulis'>{size}</View>)}</View>
                                </View>
                            )
                        }
                    </View>
                </View>
            </View>
        )
        
        // const pickerPrint = (

        // )

        return (
            <View className='myDocument'>
                <NavBar title='我的文档' handleBack={this.handleBack} />
                <ScrollView className='myContent'>
                    {documentLists}
                </ScrollView>
                {bottomButton}
                {/* {show ? {}
                    // <Picker
                    //     mode="multiSelector"
                        
                    // >

                    // </Picker>
                    : {}} */}
                {/* <Picker
                    mode='multiSelector'
                    range={printList}
                    rangeKey={selectedPrintList}
                /> */}

            </View>
        )
    }
}

export default Document as ComponentClass<PageOwnProps, PageState>