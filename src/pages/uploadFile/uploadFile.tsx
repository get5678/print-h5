import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Swiper, SwiperItem} from '@tarojs/components'

import NavBar from '../../components/NavBar/NavBar'
import backArrow from '../../assets/backArrow.png'
import './uploadFile.scss'



type PageStateProps = {
    printList: (number[] | string[] | any[])[];
    selectedprintList: (any)[];
    preprint: number[];
    valueGroups: object;
}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {
    valueGroups: any;
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
        valueGroups: {
            title: 'Mr.',
            firstName: 'Micheal',
            secondName: 'Jordan'
        },
        optionGroups: {
            title: ['Mr.', 'Mrs.', 'Ms.', 'Dr.'],
            firstName: ['John', 'Micheal', 'Elizabeth'],
            secondName: ['Lennon', 'Jackson', 'Jordan', 'Legend', 'Taylor']
        }
    }

    handleBack = () => {
        Taro.redirectTo({
            url: '../../pages/document/document'
        })
    }

    hanleScroll = (e) => {
        const { detail } = e;
        console.log(detail,"eeeeeeeeeeeee")
    }

    handleChange = (index,e) => {
        const { selectedprintList, printList } = this.state;

        let newselectedprintList = selectedprintList.slice();
        newselectedprintList[index] = printList[index][e.detail.current];
        console.log(newselectedprintList)
    };
    

    render() {
        const { printList, preprint, valueGroups, optionGroups  } = this.state;

        const OwnPicker = (
            <View className='ownpicker'>
                {
                    printList.map((item) => 
                     (
                            <ScrollView className='ownpicker_li' 
                             
                            scrollWithAnimation
                            onScroll={this.hanleScroll}	>
                                <View className='ownpicker_li_clo'>
                                {
                                    item.map((element) =>
                                        (<View className='ownpicker_item'>{element}</View>))
                                } 
                            </View>
                        </ScrollView>
                    
                    )
                }
            </View>
        )

        const pickerSiwper = (
            <View className='pickers'>
                {
                    printList.map((option,index) => (
                        <Swiper className='pickersSwiper'
                            vertical
                            onChange={this.handleChange.bind(this,index)}
                            key={index}
                            current={preprint[index]}
                            
                            >
                                
                                    {option.map((value,index) => (
                                        <SwiperItem className='pickersItem' key={index}>
                                            {value}
                                        </SwiperItem>
                                    ))}
                                
                        </Swiper>
                    ))
                }
                
            </View>
        )

        return (
            <View className='myUpload'>
                <NavBar backArrow={backArrow} title='' handleBack={this.handleBack} />
                
                {pickerSiwper}
            </View>
        )
    }

}
export default UploadFile as ComponentClass<PageOwnProps, PageState>