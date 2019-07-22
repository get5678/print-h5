import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Image, Text, Button, Picker } from '@tarojs/components'

import NavBar from '../../components/NavBar/NavBar'
import { BlankPage } from '../../components/blankPage/blankPage'
import { Toast } from '../../components/toast/toast'

import './document.scss'

import word from './pic/word.png'
import pdf from './pic/pdf.png'
import ppt from './pic/ppt.png'
import question from './pic/question.png'
import unkown from './pic/unknown.png'
import list from './pic/list.png'
import arrow from '../../assets/arrow.png'
import close from './pic/close.png'

import { connect } from '@tarojs/redux'
import { asyncGetDocumentList } from '../../actions/document'


type list = {
    id: number;
    title: string;
    time: string;
    size: string;
    img: string;
    checked?: boolean;
}[];

type PageStateProps = {
    document:{
        documentList: {
            id: number;
            title: string;
            time: string;
            size: string;
            img: string;
            checked?: boolean;
        }[];
    },
    shopTitle: string;
}

type PageDispatchProps = {
    get: (payload) => void;
}

type PageOwnProps = {

}

type PageState = {
    Lists: {
        id: number;
        title: string;
        time: string;
        size: string;
        img: string;
        checked?: boolean;
    }[];
    page: number | any,
    selected: boolean;
    selectedDocument: boolean;
    show: boolean;
    printList: (string[] | number[])[];
    selectedprintList: (any)[];
    price: number;
    preprint: number[];
    shopTitle: string;
    showToast: boolean;
    src?: any;
    taostText?: string;
    uploadsuccess: boolean;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Document {
    props: IProps;
    taostText: string,
}

@connect(
    ({document}) => ({
        document
    }), (dispatch) => ({
        get(params) {
            dispatch(asyncGetDocumentList(params));
        }
        
    })
)
class Document extends Component<IProps, PageState> {

    config: Config = {
        navigationBarTitleText: '我的文档',
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
        page: 1,
        selected: false,
        selectedDocument: false,
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
        shopTitle: '',
        showToast: false,
        uploadsuccess: false,
        src: '',
        taostText: '上传失败'
    }

    handleBack = () => {
        Taro.redirectTo({
            url: '../mine/mine'
        })
        Taro.removeStorageSync('documentId');
    }

    handleChoose = (id: number) => {
        const { Lists } = this.state;
        let flag = false;
        let ListsAnother: list = Object.assign({},Lists);
        let ListArray :any = [];
        for (let i in ListsAnother) {
            ListArray.push(ListsAnother[i])
        }
        ListArray[id].checked = !ListArray[id].checked;
        ListArray.map((item) => {
            if (item.checked) {
                flag = true;
            }
        })
        this.setState({
            Lists: ListArray,
            selectedDocument: flag
        })
    }

    handlePreview = (id: number) => {
        console.log(id)
        Taro.redirectTo({
            url: '../uploadFile/uploadFile'
        })
    }

    handleToShop = () => {
        console.log("2222222222222")
        if(this.state.selectedDocument) {
            Taro.navigateTo({
                url: '../chooseShop/chooseShop'
            })
        }
        else {
            console.log("请选择打印文档")
        }
    }

    /**
     *@description 确认打印，传打印参数
     *
     * @memberof Document
     */
    handlePrint = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("111111111111111111")
        this.setState({
            show: false
        })
    }

    handleTest = (e) => {
        e.stopPropagation();
        console.log("test test test test");
    }
        
    
    handleUpload = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const data = new FormData();
        // const reader = new FileReader();
        data.append('file',file);
        fetch('https://min.our16.top/cloudprint/api/document/upload',{
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
                    selected: true,
                    //uploadsuccess: false
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

    handleShowPicker = (e) => {
        // e.stopPropagation();
        if (this.state.selectedDocument) {
            this.setState({
                show: !this.state.show
            })
        } 
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

    

    /**
     *@description 下拉刷新
     *
     * @memberof Document
     */
    handleToLower = () => {
        
        this.setState({
            page: this.state.page++,
        }, () => {
            this.props.get({
                'page':this.state.page
            })
            
        })
    }

    componentWillMount() {
        let { Lists, page } = this.state;
        let flag = false;
        // const { shopTitle } = this.props;
        const { id, title } = this.$router.params;
        let ListStore = Taro.getStorageSync('documentId')
        let ListsAnother: list = [];
        console.log(ListStore,"list")

        // this.props.get({
        //     'page': page,
        //     'count': 10,
        // })
        // console.log(this.props.get, "props get")
       
        Lists.map((item) => {
            ListsAnother.push(Object.assign({}, item, { checked: false }))
        });

        if (ListStore.length !== 0) {
            ListStore.map(( item) => {
                ListsAnother[item].checked = true,
                flag = true;
            })
        }
       
        this.setState({
            shopTitle: decodeURI(title),
            Lists: ListsAnother,
            selectedDocument: flag
        })
    }

    componentDidUpdate() {

        const { Lists } = this.state;
        let selectArray:any = [];
        Lists.map((item) => {
            if(item.checked) {
                selectArray.push(item.id)
            }
        })
        Taro.setStorageSync('documentId', selectArray);
    }

    render() {

        const { Lists, show, printList, preprint, price, showToast, uploadsuccess, shopTitle, selectedDocument } = this.state;
        
        const documentLists = (
            <ScrollView 
                scrollY 
                className='myContent' 
                style={{overflow: `${show ? 'hidden': ''}`}}
                // onScrollToLower={this.handleToLower.bind(this)}
                >
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
            <View className='buttons' onClick={this.handleTest.bind(this)}>
                <View className='buttonscover'></View>
                <View className='shopTitle'>
                    <Text className='shopText'>打印店铺：{shopTitle}</Text>
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

        const chooseShop = (
            <Button className='docprint docButt' 
                style={{ background: `${selectedDocument ? '#2fb9c3' : '#D7D7D7'}` }}
                onClick={this.handleToShop.bind(this)}>打印</Button>
        )

        const choosePrint = (
            <Picker mode='multiSelector' 
                range={printList} 
                onChange={this.handlePrint} 
                value={preprint}
                onColumnChange={this.handleShowPrice} 
                onCancel={this.handleShowPicker} 
                disabled={!selectedDocument}
            >
                <View onClick={this.handleShowPicker} >
                    <Button className='docprint docButt' 
                        style={{ background: `${selectedDocument ? '' : '#D7D7D7'}` }}
                        >打印</Button>
                </View>
            </Picker>
        )

        const showprint = (
            <View className='docBottom'>
                <View className='docButton'>
                    <Button className='docupload docButt'>
                        上传文件 
                        <form>
                            <input className='upluadinput' type="file" id='test' onChange={this.handleUpload.bind(this)} /> 
                        </form>
                    </Button>
                    { shopTitle === 'undefined' ? chooseShop : choosePrint}
                </View>
                {show ? Buttons : ''}
            </View>
        )

        const blankPage = (
            <BlankPage
                title='暂无文档赶快上传吧~'
                picture={require('../../assets/blank-compents/blank-box-empty.png')}
            />
        )

        const toast = ( uploadsuccess ?  
                <Toast 
                picture={require('./pic/uploadsuccess.png') }
                title = '上传成功'
                confirm = '我知道了'
                subTitle = '上传成功可以去打印啦'
                cancel = '去预览'
                onConfirm = {this.closeToast.bind(this)}
                />   : 
                <Toast
                picture={require('./pic/uploadfail.png') }
                title={this.state.taostText}
                subTitle='差点就成功了再试试吧~'
                confirm='我知道了'
                onConfirm={this.closeToast.bind(this)}
                />
            )

        const loading = (
            <Toast
                picture={require('./pic/uploading.png')}
                title='正在上传'
                confirm='取消上传'
                onConfirm={this.closeToast.bind(this)}
            />
        )
        

        const myDocument = (
            <View className='alldocument'>
                {documentLists}
                {showprint}
            </View>
        )

        const shopTitleTop = (
            <View className='shopTitleTop' onClick={this.handleToShop.bind(this)}>
                <Image src={require('../../assets/images/index/address.png')} className='shopTitleTop-img'/>
                <Text className='shopTitleTop-text'>{shopTitle}</Text>
            </View>
        )
        
        return (
            <View className='myDocument'>
                <NavBar title='我的文档' handleBack={this.handleBack} />
                {shopTitle === 'undefined' ? '' : shopTitleTop}
                {Lists.length === 0 ? blankPage : myDocument}
                {showToast ? toast : '' }
                {/* {loading} */}
            </View>
        )
    }
}

export default Document as ComponentClass<PageOwnProps, PageState>