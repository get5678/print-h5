import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Image, Text, Button, Picker } from '@tarojs/components'

import NavBar from '../../components/NavBar/NavBar'
import { BlankPage } from '../../components/blankPage/blankPage'
import { Toast } from '../../components/toast/toast'
import timeFn from '../../utils/timeFn'
import testFile from '../../utils/testFile'

import './document.scss'
import list from './pic/list.png'
import arrow from '../../assets/arrow.png'
import close from './pic/close.png'

import { connect } from '@tarojs/redux'
import { asyncGetDocumentList, asyncGetGroupPrice } from '../../actions/document'

import { controller, signal } from './controller'

type list = {
    id: number;
    docName: string;
    docUploadTime: Date;
    docSize: string;
    docAvatar: string;
    checked?: boolean;
    docPageTotal: number;
    status?:number;
    docUrl?: string;
}[];

type PageStateProps = {
    document:{
        documentList: any,
        groupPrice: any,
    },
}

type PageDispatchProps = {
    getList: (payload) => any;
    getGroupPrice: (payload) => any;
}

type PageOwnProps = {}

type PageState = {
    Lists: {
        id: number;
        docName: string;
        docUploadTime: Date;
        docSize: string;
        docAvatar: string;
        checked?: boolean;
        docPageTotal: number;
        status?: number;
        docUrl :string;
    }[];
    count: number | any;
    page: number;
    selected: boolean;
    selectedDocument: boolean;
    show: boolean;
    printList: (string[] | number[])[];
    selectedprintList: (any)[];
    price: number;
    preprint: number[];
    shopId: number | any;
    shopTitle: string;
    showToast: boolean;
    src?: any;
    taostText: string;
    uploadsuccess: boolean;
    loadingProcess: any;
    loadingProc: any;
    uploadshow: boolean;
    ListStore: number[];
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
        getList(params) {
            dispatch(asyncGetDocumentList(params));
        },
        getGroupPrice(params) {
            dispatch(asyncGetGroupPrice(params));
        },
    })
)
class Document extends Component<IProps, PageState> {

    config: Config = {
        navigationBarTitleText: '我的文档',
    }

    constructor(IProps) {
        super(IProps);
        this.handleBack = this.handleBack.bind(this);
        this.state = {
            Lists: [],
            page: 1,
            count: 0,
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
            shopId: -1,
            showToast: false,
            uploadsuccess: false,
            src: '',
            taostText: '上传失败',
            loadingProcess: 0,
            loadingProc: 0,
            uploadshow: false,
            ListStore: [],
        }       
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

    /**
     * @description 预览
     */
    handlePreview = (id: number) => {
        const { Lists } = this.state;
        if (Lists[id].status === 1) {
            window.open(Lists[id].docUrl)
        }
        else {
            Taro.showToast({
                title: '文件转换中',
                icon: 'loading',
                mask: true,
                duration: 1000
            })
        }
        
    }

    handleToShop = () => {
        if(this.state.selectedDocument) {
            Taro.navigateTo({
                url: '../chooseShop/chooseShop'
            })
        }
        else {
            this.setState({
                show: false,
            })
        }
    }

    /**
     *@description 确认打印，传打印参数
     */
    handlePrint = (e) => {
        e.stopPropagation();
        e.preventDefault();

        this.setState({
            show: false
        })
    }

    /**
     * @description 上传文件
     */
    handleUpload = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const data = new FormData();
        const token = Taro.getStorageSync('token') || 'b4ed6334-c27f-40a5-83b5-d0f96c3a3e03';
        data.append('file',file);
        fetch('https://pin.varbee.com/cloudprint/api/document/upload',{
            method: 'POST',
            body: data,
            headers: {
                token: token,
            },
            signal 
        })
        .then(res => {

            this.props.getList({
                page: 1,
                count: 7,
            })
            console.log("response: ",res)
            if(res.ok) {    
                this.setState({
                    Lists: [],
                    page:1,
                    uploadshow: false,
                    //uploadsuccess: true,
                    //showToast: true
                })
            } else {
                this.setState({
                    uploadshow: false,
                    uploadsuccess: false,
                    showToast: true
                })
            }
        })
        .catch(err => console.log('Error:', err))

        let i = 0
        const mm = setInterval(() => {
            this.setState({
                loadingProcess: i,

            }, () => {
                i++;
                if (i <= 50) {
                    this.setState({
                        loadingProc: i * 2,
                    })
                }
                if (i == 100) {
                    clearInterval(mm)
                }
            })
        }, 50)
        
        this.setState({
            uploadshow: true,
        })
    }

    handleCancelUpload = () => {
        controller.abort();
        this.setState({
            uploadshow: false
        })
    }

    /**
     * @description 计算价格
     */
    calculationPrice = (str:string, count:number):number => {
        const { combination, prirce } = this.props.document.groupPrice;
        const { Lists, ListStore } = this.state;
        let price:any = 0.00;
        combination.map((item) => {
            if (item.printType == str) {
                price += item.printPrice
            }
        })
        price = Lists[ListStore[0]].docPageTotal * count * price;
        price += prirce/100;
        price = price.toFixed(2);
        return price;
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
       
        let str = newselectedprintList[3] + newselectedprintList[2] + newselectedprintList[0];
        nowprice = this.calculationPrice(str,newselectedprintList[1]);
        this.setState({
            selectedprintList: newselectedprintList,
            preprint: newpreprint,
            price: nowprice
        });
        
    }

    handleShowPicker = () => {
        const { selectedprintList } = this.state;
        let str = selectedprintList[3] + selectedprintList[2] + selectedprintList[0];
        let price = 0.00;
        price = this.calculationPrice(str,selectedprintList[1]);
        if (this.state.selectedDocument) {
            this.setState({
                show: true,
                price: price
            })
        } 
    }

    handleHidePicker = () => {
        if (this.state.selectedDocument) {
            this.setState({
                show: false,
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
     *@description 上拉刷新
     */
    handleToLower = () => {
        if (this.props.document && this.props.document.documentList.total > this.state.count) {  
            this.setState({
                page: this.state.page+1
            }, () => {
                this.props.getList({
                    page: this.state.page,
                    count: 7
                })
            });
        }
    }

    /**
     * @description 下拉刷新
     */
    handleToTop = () => {
        Taro.startPullDownRefresh().
        then( () => {
            this.props.getList({
                page: 1,
                count: 7
            })
        })
        
    }

    componentWillMount() {
        const { id, title } = this.$router.params;
        const ListStore = Taro.getStorageSync('documentId');  
        const token = Taro.getStorageSync('token') || 'b4ed6334-c27f-40a5-83b5-d0f96c3a3e03';
        if(token === '') {
            Taro.showModal({
                title: '暂未登录',
                content: '点击确认按钮跳转登录页面',
                confirmText: '登录',
                confirmColor: '#31c0cb',
                success: (res) => {
                    if (res.confirm) {
                        Taro.redirectTo({
                            url: '../bindPhone/bindPhone'
                        })
                    }
                    if(res.cancel) {
                        Taro.redirectTo({
                            url:'../mine/mine'
                        })
                    }
                }
            }).then( res => console.log("redsdsdsdss:",res))
        }
        this.setState({
            shopTitle: decodeURI(title),
            shopId: id,
            ListStore: ListStore
        })
        

    }

    componentDidMount() {
        this.props.getList({
            page: 1,
            count: 7
        })
        if (this.state.shopId) {
            this.props.getGroupPrice({
                'merchantId': this.state.shopId
            })
        }
    }

    componentWillReceiveProps(nextProps) {     
        let ListA = nextProps.document.documentList ? nextProps.document.documentList.documentDTOList : [];
        const { ListStore, Lists } = this.state;
        let flag = false;
        let List = Lists;
        if(this.state.page === 1) {
            List = [];
        }
        if (ListA.length !== 0 && List.length !== 0 && List[0].id === ListA[0].id) {
            return ;
        }
        if (ListA.length !== 0) {
            ListA.map((item) => {
                List.push(Object.assign({}, item, { checked: false }))
            });
        }
        if (ListStore.length !== 0 && List.length !== 0) {
            ListStore.map((item) => {
                List[item].checked = true
            });
            flag = true;
        }
        this.setState({
            Lists: List,
            selectedDocument: flag,
            count: List.length
        })   
    } 

    componentDidUpdate() {
        const { Lists } = this.state;
        let selectArray:any = [];
        Lists.map((item,index) => {
            if(item.checked) {
                selectArray.push(index)
            }
        })
        Taro.setStorageSync('documentId', selectArray); 
    }

    componentWillUnmount() {
    }
   
    render() {

        const { 
            Lists,
            show, 
            printList, 
            preprint, 
            price, 
            showToast, 
            taostText,
            uploadsuccess, 
            shopTitle, 
            selectedDocument,
            loadingProcess,
            loadingProc,
            uploadshow
        } = this.state; 
      
        let prirce = this.props.document.groupPrice ? this.props.document.groupPrice.prirce : undefined;    
        const documentLists = (
            <ScrollView 
                scrollY={!show}
                className='myContent' 
                style={{overflow: `${show ? 'hidden': ''}`}}
                onScrollToLower={this.handleToLower.bind(this)}
                onScrollToUpper={this.handleToTop.bind(this)}
                >
                { Lists.map((list, index) => (
                    <View key={list.id} className='docuList'>
                        <View className='docuBefore'
                            style={{ background: `${list.checked ? '#2fb9c3' : ''}` }} onClick={this.handleChoose.bind(this, index)}
                        ></View>
                        <Image src={testFile(list.docName)} className='docuImg' onClick={this.handleChoose.bind(this, index)}
                        />
                        <View className='docuContent' onClick={this.handleChoose.bind(this, index)}>
                            <Text className='docuTitle'>{list.docName}</Text>
                            <View className='docuText'>
                                <Text className='docuSize'>{list.docSize}</Text>
                                <Text>{timeFn(list.docUploadTime)}</Text>
                            </View>
                        </View>
                        <View className='arrowTo' onClick={this.handlePreview.bind(this, index)}>
                            <Image src={arrow} className='arrowright'  />
                        </View>
                    </View>)) }
            </ScrollView>
        )

        const Buttons = (
            <View className='buttons'>
                <View className='buttonscover'></View>
                <View className='shopTitle'>
                    <Text className='shopText'>打印店铺：{shopTitle}</Text>
                    <Image className='shoppic' src={close}/>
                </View>
                <View className='totallprice'>
                    合计：<Text className='price'>￥{price}</Text>
                    {prirce && prirce !== 0 ? <Text className='extralPrice'>{prirce/100}</Text> : ''}
                </View>
                <View className='surebutton'>
                    <Button className='printbut'>确认打印</Button>
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
                onChange={this.handlePrint.bind(this)} 
                value={preprint}
                onColumnChange={this.handleShowPrice} 
                onCancel={this.handleHidePicker} 
                disabled={!selectedDocument}
            >
                <View onClick={this.handleShowPicker} >
                    <Button className='docprint docButt' style={`background: ${selectedDocument ? '' : '#D7D7D7'}`}>打印</Button>
                </View>
            </Picker>
        )

        const showprint = (
            <View className='docBottom'>
                <View className='docButton'>
                    <Button className='docupload docButt'>
                        上传文件 
                        <form>
                            <input className='upluadinput' type="file" onChange={this.handleUpload.bind(this)} /> 
                        </form>
                    </Button>
                    { shopTitle === 'undefined' ? chooseShop : choosePrint}
                </View>
                {show ? Buttons : ''}
            </View>
        )

       
        const uploadPage = (
            <View className='uploadPage'>
                <Image className='upload_img' src={require('../../assets/blank-compents/load-success.png')}/>
                <View className='upload_title'>
                    <Text className='upload_text'>正在加载中</Text>
                    <View className='upload_span'>
                        <Text className='upload_item'></Text>
                        <Text className='upload_item'></Text>
                        <Text className='upload_item'></Text>
                        <Text className='upload_item'></Text>
                    </View>
                </View>
            </View>
        )

        const uploadFail = (
            <BlankPage 
                title='加载失败'
                picture={require(`../../assets/blank-compents/load-fail.png`)}
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
                title={taostText}
                subTitle='差点就成功了再试试吧~'
                confirm='我知道了'
                onConfirm={this.closeToast.bind(this)}
                />
            )

        const loading = (
            <View className='loading_cover'>
                <View className='loading_toast'>
                    <View className='loading_paper' style={`background-position:  0 ${loadingProcess}%`}>
                        <View className='loading_printer' style={`background-position:  0 ${loadingProc}%` } >
                        </View>
                    </View>
                    <Image className='loading_img' src={require('./pic/uploading.png')} />
                    <Text className='loading_text'>正在上传{loadingProcess}%</Text>
                    <Button className='loading_button' onClick={this.handleCancelUpload.bind(this)}>取消上传</Button>
                </View>
            </View>
        )
        


        const myDocuemnt = (         
            <View className='alldocument'>
               { Lists.length !== 0 ?   documentLists  : 
                <BlankPage
                    title='暂无文档赶快上传吧~'
                    picture={require('../../assets/blank-compents/blank-box-empty.png')}
                />}
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
                {this.props.document.documentList ? myDocuemnt : uploadFail}    
                {showToast ? toast : '' }
                {uploadshow ? loading: ''} 
            </View>
        )
    }
}

export default Document as ComponentClass<PageOwnProps, PageState>