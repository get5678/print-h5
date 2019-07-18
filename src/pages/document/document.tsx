import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Image, Text, Button, Picker } from '@tarojs/components'

import NavBar from '../../components/NavBar/NavBar'
import { BlankPage } from '../../components/blankPage/blankPage'
import { Toast } from '../../components/toast/toast'

import './document.scss'

import document from '../../assets/blank-compents/blank-box-empty.png'
import word from './pic/word.png'
import pdf from './pic/pdf.png'
import ppt from './pic/ppt.png'
import question from './pic/question.png'
import unkown from './pic/unknown.png'
import list from './pic/list.png'
import arrow from '../../assets/arrow.png'
import backArrow from '../../assets/backArrow.png'
import close from './pic/close.png'


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
    selectedprintList: (any)[];
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
    showToast: boolean;
    src?: any;
    title: string;
    uploadsuccess: boolean;
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
            ['A4', 'B5'],
            [1, 2, 3, 4, 5],
            ['单面', '双面'],
            ['黑白', '彩色']
        ],
        selectedprintList: ['A4', 1, '单面', '黑白'],
        price: 0.00,
        preprint: [0, 0, 0, 0],
        shopTitle: '阳光图文打印店',
        showToast: false,
        uploadsuccess: false,
        src: '',
        title: '上传失败'
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

    handlePreview = (id: number) => {
        console.log(id)
        Taro.redirectTo({
            url: '../../pages/uploadFile/uploadFile'
        })
    }

    handlePrint = (): void => {
        this.setState({
            show: !this.state.show
        })
    }
    
    handleUpload = (e) => {
        e.preventDefault();
        let file = e.target.files[0];
        let data = new FormData();
        data.append('file',file);
        fetch('https://pin.varbee.com/cloudprint/api/document/upload',{
            method: 'POST',
            body: data
        }).then(res => {
            if(res.ok) {
                this.setState({
                    uploadsuccess: true
                })
            }
            else{
                this.setState({
                    uploadsuccess: false
                })
            }
        })
       
        this.setState({
            showToast: !this.state.showToast
        })
    }

    handleShowPrice = (e):any => {
        const { printList, selectedprintList, preprint } = this.state;
        const { detail } = e;
        let newselectedprintList = selectedprintList.slice();
        let newpreprint = preprint.slice();
        let nowprice: number | any = 0;

        newpreprint[detail.column] = detail.value;
        while (detail.column < 3 && detail.column >= 0) {     
            newpreprint[detail.column+1] = 0;
            detail.column++;
        }
        newpreprint.map((value,index) => {
            newselectedprintList[index] = printList[index][value]
        })
        newselectedprintList.map((item) => {
            if (item === 'A4' || item === 'B5') {
                nowprice += 0.8;
            }
            else if (typeof (item) === 'number') {
                nowprice *= (item);
            }
            else if (item === '黑白' || item === '彩色') {
                nowprice += 0.8;
            }
            else if (item === '双面' || item === '单面') {
                nowprice += 0.8;
            }
            else {
                nowprice = 0;
            }
        })
        nowprice = nowprice.toFixed(2);
        
        this.setState({
            selectedprintList: newselectedprintList,
            preprint: newpreprint,
            price: nowprice
        });
        
    }

    handleShowPicker = () => {
        this.setState({
            show: !this.state.show
        })

    }

    closeToast = () => {
        this.setState({
            showToast: !this.state.showToast
        })
    }
    handlePreshow = () => {
        this.setState({
            showToast: !this.state.showToast
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

        const { Lists, show, printList, preprint, price, showToast, uploadsuccess } = this.state;
        
        const documentLists = (
            <ScrollView scrollY className='myContent' style={{overflow: `${show ? 'hidden': ''}`}}>
                {Lists.map((list, index) => (
                    <View key={list.id} className='docuList'>
                        <View className='docuBefore' 
                            style={{ background: `${list.checked ? '#2fb9c3' : ''}` }}
                            onClick={this.handleChoose.bind(this, index)}
                            ></View>
                        <Image src={list.img} className='docuImg' 
                            onClick={this.handleChoose.bind(this, index)}
                            />
                        <View className='docuContent'
                            onClick={this.handleChoose.bind(this, index)}>
                            <Text className='docuTitle'>{list.title}</Text>
                            <View className='docuText'>
                                <Text className='docuSize'>{list.size}</Text>
                                <Text>{list.time}</Text>
                            </View>
                        </View>
                        <Image src={arrow} className='arrowright' onClick={this.handlePreview.bind(this,index)}/>
                    </View>))}
            </ScrollView>
        )

        const Buttons = (
            <View className='buttons'>
                <View className='buttonscover'></View>
                <View className='shopTitle'>
                    <Text>打印店铺：{this.state.shopTitle}</Text>
                    <Image className='shoppic' src={close}/>
                </View>
                <View className='totallprice'>
                    合计：<Text className='price'>￥{price}</Text>
                </View>
                <View className='surebutton'>
                    <Button className='printbut' onClick={this.handlePrint.bind(this)}>确认打印</Button>
                </View>
            </View>
        )

        const showprint = (
            <View className='docBottom'>
                <View className='docButton'>
                    <Button className='docupload docButt'>
                        上传文件 
                        <form>
                            <input className='upluadinput' type="file" id='test' onChange={this.handleUpload.bind(this)} multiple /> 
                        </form>
                    </Button>
                    <Picker mode='multiSelector' range={printList} onChange={this.handlePrint} value={preprint}
                        onColumnChange={this.handleShowPrice} onCancel={this.handleShowPicker}
                    >
                        <View onClick={this.handleShowPicker} >
                            <Button className='docprint docButt' onClick={this.handlePrint}>打印</Button>
                        </View>
                    </Picker>
                </View>
                {show ? Buttons : ''}
            </View>
        )

        const blankPage = (
            <BlankPage
                title='暂无文档赶快上传吧~'
                picture={document}
            />
        )

        const toast = ( uploadsuccess ?  
                <Toast 
                picture={require('./pic/uploadsuccess.png') }
                title = '上传成功'
                confirm = '我知道了'
                subTitle = '上传成功可以去打印啦'
                cancel = '去预览'
                model
                onConfirm = {this.closeToast.bind(this)}
                onCancel = { this.handlePreshow.bind(this) }
                />   : 
                <Toast
                picture={require('./pic/uploadfail.png') }
                title={this.state.title}
                subTitle='差点就成功了再试试吧~'
                confirm='我知道了'
                onConfirm={this.closeToast.bind(this)}
                />
            )
        

        const myDocument = (
            <View className='alldocument'>
                {documentLists}
                {showprint}
            </View>
        )
        
        return (
            <View className='myDocument'>
                <NavBar backArrow={backArrow} title='我的文档' handleBack={this.handleBack} />
                {Lists.length === 0 ? blankPage : myDocument}
                {showToast ? toast : '' }
            </View>
        )
    }
}

export default Document as ComponentClass<PageOwnProps, PageState>