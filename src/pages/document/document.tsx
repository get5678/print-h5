import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Image, Text, Button, Picker } from '@tarojs/components'

import NavBar from '../../components/NavBar/NavBar'
import { BlankPage } from '../../components/blankPage/blankPage'
import { Toast } from '../../components/toast/toast'
import timeFn from '../../utils/timeFn'
import testFile from '../../utils/testFile'

import './document.scss'

import arrow from '../../assets/arrow.png'
import close from './pic/close.png'

import { connect } from '@tarojs/redux'
import { asyncGetDocumentList, asyncGetGroupPrice, asyncGetpayorderId } from '../../actions/document'

import {  xhr } from './controller'


type PageStateProps = {
    document:{
        documentList: any,
        groupPrice: any,
        wxpay: any,
        payid: any,
    },
}

type PageDispatchProps = {
    getList: (payload) => any;
    getGroupPrice: (payload) => any;
    getPayid: (payload) => any;
}

type PageOwnProps = {}

type PageState = {
    Lists: {
        id: number;
        docName: string;
        docUploadTime: Date;
        docSize: string;
        docAvatar: string;
        docPageTotal: number;
        status?: number;
        docUrl :string;
    }[];
    count: number | any;
    choosedocid: number| any;
    page: number;
    selectedDocument: boolean;
    show: boolean;
    printList: (string[] | number[])[];
    selectedprintList: (any)[];
    price: number;
    preprint: number[];
    shopId: number | any;
    shopTitle: string;
    showToast: boolean;
    taostText: string;
    uploadsuccess: boolean;
    showUploadOvertext: boolean;
    loadingProcess: any;
    loadingProc: any;
    uploadshow: boolean;
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
        getPayid(params) {
            dispatch(asyncGetpayorderId(params));
        }
    })
)
class Document extends Component<IProps, PageState> {

    config: Config = {
        navigationBarTitleText: '????????????',
    }

    constructor(IProps) {
        super(IProps);
        this.handleBack = this.handleBack.bind(this);
        this.state = {
            Lists: [],
            page: 1,
            count: 0,
            choosedocid: undefined,
            selectedDocument: false,
            show: false,
            printList: [
                ['A4', 'B5'],
                [1, 2, 3, 4, 5],
                ['??????', '??????'],
                ['??????', '??????']
            ],
            selectedprintList: ['A4', 1, '??????', '??????'],
            price: 0.00,
            preprint: [0, 0, 0, 0],
            shopTitle: '',
            shopId: -1,
            showToast: false,
            uploadsuccess: false,
            taostText: '????????????',
            loadingProcess: 0,
            loadingProc: 0,
            uploadshow: false,
            showUploadOvertext: false,
        }       
    }
    handleBack = () => {
        Taro.redirectTo({
            url: '../mine/mine'
        })
        Taro.removeStorageSync('documentId');
    }

    handleChoose = (id: number) => {
        if(id === this.state.choosedocid) {
            this.setState({
                selectedDocument: !this.state.selectedDocument,
            })
        } else {
            this.setState({
                choosedocid: id,
                selectedDocument: true,
            })
        }
    }

    /**
     * @description ??????
     */
    handlePreview = (id: number) => {
        const { Lists } = this.state;
        if (Lists[id].status === 1) {
            window.open(Lists[id].docUrl)
        }
        else {
            Taro.showToast({
                title: '???????????????',
                icon: 'loading',
                mask: true,
                duration: 1000
            })
        }
    }

    handleToShop = () => {
        let shopId = this.state.shopId !== -1 ? this.state.shopId : undefined;
        if(this.state.choosedocid) {
            Taro.navigateTo({
                url: `../chooseShop/chooseShop?id=${shopId}`
            })
        }
        else {
            this.setState({
                show: false,
            })
        }
    }

    /**
     *@description ??????????????????????????????
     */
    handlePrint = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const { price } = this.state;
        const { shopId, choosedocid, selectedprintList } = this.state;
        
        this.props.getPayid({
            printNum: selectedprintList[1],
            printSize: selectedprintList[0],
            printDirection: selectedprintList[2],
            printType: selectedprintList[3],
            merchantId: shopId,
            documentId: choosedocid,
        })
        Taro.showModal({
            title: '??????',
            content: `???????????????${price}`,
            success: () => {
                const { orderId, totalFee } = this.props.document.payid
                const params =
                    `<xml>
                        <out_trade_no>${orderId}</out_trade_no>
                        <return_code>SUCCESS</return_code>
                        <total_fee>${totalFee}</total_fee>
                    </xml>`;
                fetch('http://min.our16.top/cloudprint/api/wxpay/min/reback', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/xml',
                    },
                    body: params
                    })
                    .then(res => res.text())
                    .then(data => console.log("data", data))
                    .catch((err) => console.log("????????????", err))
            }
        })
        
        this.setState({
            show: false
        })
    }


    /**
     * @description ????????????
     */
    handleUpload = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const data = new FormData();
        const token = Taro.getStorageSync('token');
       
        data.append('file',file);

        this.setState({
            uploadshow: true,
        })

        xhr.upload.onprogress = (e) => {   
            if(e.lengthComputable) {
                const process = Number(((e.loaded / e.total) * 100).toFixed(1));
                this.setState({
                    loadingProcess: process,
                })
                if (process <= 51) {
                    this.setState({
                        loadingProc: process * 2,
                    })
                }
                if (process == 100) {
                    this.setState({
                        loadingProc: 100,
                    })
                }
            }
            else {
                this.setState({
                    loadingProc: 0,
                    loadingProcess: 0,
                })
            }
            
        }

        xhr.onload = () => {
                console.log("response:", xhr.response)
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    this.props.getList({
                        page: 1,
                        count: 7
                    })
                    if (xhr.response.code == 1 && xhr.response.msg == '????????????') {
                        this.setState({
                            Lists: [],
                            page: 1,
                            uploadshow: false,
                            uploadsuccess: true,
                            showToast: true
                        })
                    }
                    else{
                        this.setState({
                            Lists: [],
                            page: 1,
                            uploadshow: false,
                            uploadsuccess: false,
                            showToast: true,
                            taostText: xhr.response.msg
                        })
                    }
                }
        }
        xhr.onerror = () => { console.log("err:", xhr.statusText)}
        xhr.onabort = () => {
            data.delete("file");
           
            if (xhr.status == 0) {
                Taro.showToast({
                title: '??????????????????',
                icon: 'success',
                duration: 1500
                })
            }
        }
        
        xhr.open('POST', 'https://pin.varbee.com/cloudprint/api/document/upload', true);
        xhr.setRequestHeader('token', token);
        xhr.responseType = "json";
        xhr.send(data);
       
    }

    handleCancelUpload = (e) => {
        e.preventDefault();
        xhr.abort();
        this.setState({
            uploadshow: false
        })
    }

    /**
     * @description ????????????
     */
    calculationPrice = (str:string, count:number):number => {
        const { combination, prirce } = this.props.document.groupPrice;
        const { choosedocid, Lists } = this.state;
        let pages = 0;
        let price:any = 0.00;
        combination.map((item) => {
            if (item.printType == str) {
                price += item.printPrice
            }
        })
        Lists.map((item) => {
            if(item.id === choosedocid) {
                pages = item.docPageTotal;
            }
        })
        if(str[2] === '???') {
            pages = Math.ceil(pages / 2);
        }
        price = pages * count * price;
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
   
    /**
     *@description ????????????
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
            Taro.showToast({
                title: '?????????',
                icon: 'loading',
                duration: 1200
            })
        }else {
            this.setState({
                showUploadOvertext: true
            })
        }
    }

    /**
     * @description ????????????
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
        const choosedocid = Taro.getStorageSync('documentId');  
        const token = Taro.getStorageSync('token');
        let flag = choosedocid ? true : false;
        if(token === '') {
            Taro.showModal({
                title: '????????????',
                content: '????????????????????????????????????',
                confirmText: '??????',
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
            choosedocid: choosedocid,
            selectedDocument: flag,
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
        const {  Lists } = this.state;
        let List = Lists;
        if(this.state.page === 1) {
            List = [];
        }
        if (ListA.length !== 0 && List.length !== 0 && List[0].id === ListA[0].id) {
            return ;
        }
        if (ListA.length !== 0) {
            ListA.map((item) => {
                List.push(Object.assign({}, item))
            });
        }
        this.setState({
            Lists: List,
            count: List.length
        })   
    } 

    componentDidUpdate() {
        const { choosedocid, selectedDocument } = this.state;
        let docId = choosedocid;
        if (!selectedDocument) {
            docId = undefined;
        }
        Taro.setStorageSync('documentId', docId); 
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
            uploadshow,
            showUploadOvertext,
            choosedocid
        } = this.state; 
      
        let prirce = this.props.document.groupPrice ? this.props.document.groupPrice.prirce : undefined;    
        console.log("price",prirce)
        const documentLists = (
            <ScrollView 
                scrollY={!show}
                className='myContent' 
                style={{overflow: `${show ? 'hidden': ''}`}}
                onScrollToLower={this.handleToLower.bind(this)}
                // onScrollToUpper={this.handleToTop.bind(this)}
                >
                { Lists.map((list, index) => (
                    <View key={list.id} className='docuList'>
                        <View className='docuLeft' onClick={this.handleChoose.bind(this, list.id)}>
                            <View className='docuBefore'
                                style={{ background: `${choosedocid === list.id && selectedDocument ? '#2fb9c3' : ''}` }}
                            ></View>
                            <Image src={testFile(list.docName)} className='docuImg' 
                            />
                            <View className='docuContent'>
                                <Text className='docuTitle'>{list.docName}</Text>
                                <View className='docuText'>
                                    <Text className='docuSize'>{list.docSize}</Text>
                                    <Text>{timeFn(list.docUploadTime)}</Text>
                                </View>
                            </View>
                        </View>
                        <View className='arrowTo' onClick={this.handlePreview.bind(this, index)}>
                            <Image src={arrow} className='arrowright'  />
                        </View>
                    </View>)) }
                {showUploadOvertext ? <View className='UploadOvertext'>~?????????????????????~</View> : '' }
            </ScrollView>
        )

        const Buttons = (
            <View className='buttons'>
                <View className='buttonscover'></View>
                <View className='shopTitle'>
                    <Text className='shopText'>???????????????{shopTitle}</Text>
                    <Image className='shoppic' src={close}/>
                </View>
                <View className='totallprice'>
                    {prirce && prirce !== 0 ? <View className='anotherPrice'>?????????:<Text className='extralPrice'>???{prirce / 100}</Text></View> : ''}
                    <View className='allPrice'>??????:<Text className='price'>???{price}</Text></View>
                    
                </View>
                <View className='surebutton'>
                    <Button className='printbut'>????????????</Button>
                </View>
            </View>
        )

        const chooseShop = (
            <Button className='docprint docButt' 
                style={{ background: `${selectedDocument ? '#2fb9c3' : '#D7D7D7'}` }}
                onClick={this.handleToShop.bind(this)}>??????</Button>
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
                    <Button className='docprint docButt' style={`background: ${selectedDocument ? '' : '#D7D7D7'}`}>??????</Button>
                </View>
            </Picker>
        )

        const showprint = (
            <View className='docBottom'>
                <View className='docButton'>
                    <Button className='docupload docButt'>
                        ???????????? 
                        <form>
                            <input className='upluadinput' type="file" onChange={this.handleUpload.bind(this)} /> 
                        </form>
                    </Button>
                    { shopTitle === 'undefined' ? chooseShop : choosePrint}
                </View>
                {show ? Buttons : ''}
            </View>
        )

        const uploadFail = (
            <BlankPage 
                title='????????????'
                picture={require(`../../assets/blank-compents/load-fail.png`)}
            />
        )

        const toast = ( uploadsuccess ?  
                <Toast 
                picture={require('./pic/uploadsuccess.png') }
                title = '????????????'
                confirm = '????????????'
                subTitle = '??????????????????????????????'
                cancel = '?????????'
                onConfirm = {this.closeToast.bind(this)}
                />   : 
                <Toast
                picture={require('./pic/uploadfail.png') }
                title={taostText}
                subTitle='??????????????????????????????~'
                confirm='????????????'
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
                    <Text className='loading_text'>????????????{loadingProcess}%</Text>
                    <Button className='loading_button' onClick={this.handleCancelUpload.bind(this)}>????????????</Button>
                </View>
            </View>
        )
        


        const myDocuemnt = (         
            <View className='alldocument'>
               { Lists.length !== 0 ?   documentLists  : 
                <BlankPage
                    title='???????????????????????????~'
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
                <NavBar title='????????????' handleBack={this.handleBack} />
                {shopTitle === 'undefined' ? '' : shopTitleTop}
                {this.props.document.documentList ? myDocuemnt : uploadFail}    
                {showToast ? toast : '' }
                {uploadshow ? loading: ''} 
            </View>
        )
    }
}

export default Document as ComponentClass<PageOwnProps, PageState>