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
import arrow from '../../assets/arrow.png'
import backArrow from '../../assets/backArrow.png'

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
    selected: boolean;
    show: boolean;
    printList: (string[] | number[])[];
    selectedprintList: (any)[];
    price: number;
    preprint: number[];
    shopTitle: string;
    tempFilePaths: string[];
    
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Document {
    props: IProps;
    title: string,

}

class Document extends Component<IProps, PageState> {

    config: Config = {
        navigationBarTitleText: '我的文档',
        navigationBarBackgroundColor: '#2fb9c3'
    }


    constructor(IProps) {
        super(IProps);
        this.handleBack = this.handleBack.bind(this);

    }

    state = {
        Lists:  [
            { id: 0, title: '期末资料fdfdfdfdfdfdfdfdfdfdfdf.ppt', time: '2分钟前', size: '1.20MB', img: ppt },
            { id: 1, title: '毕业论文.pdf', time: '1分钟前', size: '5.27MB', img: pdf },
            { id: 2, title: '动画.docx', time: '1分钟前', size: '188.66KB', img: word },
            { id: 3, title: '其他', time: '1天前', size: '122.43KB', img: list },
            { id: 4, title: '未知', time: '2小时前', size: '323.34KB', img: unkown },
            { id: 5, title: '问题', time: '40分钟前', size: '2.3GB', img: question },
            { id: 6, title: '期末资料.ppt', time: '2分钟前', size: '1.20MB', img: ppt },
            { id: 7, title: '期末资料.ppt', time: '2分钟前', size: '1.20MB', img: ppt },
            { id: 8, title: '最后资料.ppt', time: '2分钟前', size: '1.20MB', img: ppt },
        ],
     
        selected: false,
        show: false,
        printList: [
            ['A3', 'A4', 'B4', 'B5'],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            ['单面', '双面'],
            ['黑白', '彩色']
        ],
        selectedprintList: ['A4', 1, '单面', '黑白'],
        price: 0.00,
        preprint: [1, 0, 0, 0],
        shopTitle: '阳光图文打印店',
        tempFilePaths:[]

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

    handleUpload = () => {
        // const { tempFilePaths } = this.state;
        let File = new FileReader();
        
        // let fileType = this.files[0].type;
        File.onload = () => {

        }
        console.log(this.refs.test.value,"eeeeeeeeee")
        // Taro.redirectTo({
        //     url: '../../pages/uploadFile/uploadFile'
        // })
        // Taro.uploadFile({
        //     url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        //     filePath: tempFilePaths[0],
        //     name: 'file',
        //     formData: {
        //         'user': 'test'
        //     },
        //     success: (res) => {
        //         var data = res.data
        //         console.log(data,"data")
        //     },
        //     fail:  () => {
        //         console.log('fail')
        //     }
        // })
    }

    handleChange = () => {
        
        this.setState({ 
            show: !this.state.show
        })
    }

    handleShowPrice = (e) => {
        const { printList, selectedprintList, preprint } = this.state;
        const { detail } = e;
        let nowprice: number | any = 0;
        let newselectedprintList = selectedprintList.slice();
        let newpreprint = preprint.slice();

        newpreprint[detail.column] = detail.value;
        newselectedprintList[detail.column] = printList[detail.column][detail.value];
        
        selectedprintList.map((item) => {
            if(item === 'A4') {
                nowprice += 0.8;
            }
            else if(typeof(item) === 'number') {
                nowprice *= item;
            }
            else if(item === '黑白' || item === '彩色') {
                nowprice += 0.8;
            }
        })
        nowprice = nowprice.toFixed(2); 

        this.setState({
            price: nowprice,
            selectedprintList: newselectedprintList,
            preprint: newpreprint
        })

    }

    handleShowPicker = () => {
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

        const { Lists, show, printList, preprint, price } = this.state;
        
        const documentLists = (
            <ScrollView scrollY className='myContent' style={{overflow: `${show ? 'hidden': ''}`}}>
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
            </ScrollView>
        )

        const Buttons = (
            <View className='buttons'>
                {/* <View className='shopTitle'>
                    <Text>打印店铺：{this.state.shopTitle}</Text>
                    <Image className='shoppic' src={close} onClick={this.handleShowPicker}/>
                </View> */}
                <View className='totallprice'>
                    合计：<Text className='price'>￥{price}</Text>
                </View>
                {/* <View className='surebutton'>
                    <Button className='printbut' onClick={this.handleChange.bind(this)}>确认打印</Button>
                </View> */}
            </View>

        )

        const showprint = (
            <View className='docBottom'>
                <View className='docButton'>
                    <Button className='docupload docButt'>
                        上传文件 
                        <input ref="test" className='upluadinput' type="file" onClick={this.handleUpload.bind(this)} multiple/> 
                          
                    </Button>
                    <View>
                        <Picker mode='multiSelector' range={printList} onChange={this.handleChange} value={preprint}
                            onColumnChange={this.handleShowPrice} onCancel={this.handleShowPicker}
                        >
                            <View onClick={this.handleShowPicker} >
                                <Button className='docprint docButt' onClick={this.handlePrint}>打印</Button>
                            </View>
                        </Picker>
                    </View>
                </View>
                {show ? Buttons : ''}
            </View>
        )

        
        return (
            <View className='myDocument'>
                <NavBar backArrow={backArrow} title='我的文档' handleBack={this.handleBack} />
                
                    {documentLists}
                
                {showprint}
            </View>
        )
    }
}

export default Document as ComponentClass<PageOwnProps, PageState>