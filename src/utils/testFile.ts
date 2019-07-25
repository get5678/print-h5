/**
 * @description 根据后缀命，分配图片
 */
import word from '../pages/document/pic/word.png'
import pdf from '../pages/document/pic/pdf.png'
import ppt from '../pages/document/pic/ppt.png'
import question from '../pages/document/pic/question.png'
import unkown from '../pages/document/pic/unknown.png'
import excel from '../pages/document/pic/excel.png'

 export default function testFile(name) {
     
    let type = name.replace(/.+\./, "").toLowerCase();
    switch (type) {
        case 'txt':
            return unkown;
        case 'docx':
        case 'doc':
            return word;
        case 'pdf':
            return pdf;
        case 'ppt':
        case 'pptx':
            return ppt;
        case 'excel':
            return excel;
        default:
            return question;
    }
 }