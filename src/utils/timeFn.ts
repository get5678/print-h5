/**
 * @description 计算时间差
 * @param  Date对象
 */
export default function timeFn(before) {
    const dataNow = new Date();
    // 如果传入的时间为  1017-09-23
    const dataBefore = new Date(before.replace(/-/g, "/"));
    const dataDiff = dataNow.getTime() - dataBefore.getTime();

    const dayDiff = Math.floor(dataDiff / (24 * 3600 * 1000));
    const hoursDiff = Math.floor(dataDiff / (3600 * 1000));
    const minuteDiff = Math.floor(dataDiff / (60 * 1000));
    const secondDiff = Math.floor(dataDiff / (1000));

    if (dayDiff >= 7) {
        return `发布于7天前`;
    } else if (dayDiff < 7 && dayDiff >= 1) {
        return `发布于${dayDiff}天前`
    } else if (dayDiff < 1 && hoursDiff < 24 && hoursDiff >= 1) {
        return `发布于${hoursDiff}小时前`
    } else if (hoursDiff < 1 && minuteDiff <= 60 && minuteDiff >= 1) {
        return `发布于${minuteDiff}分钟前`
    } else if (secondDiff < 60 && secondDiff >= 1) {
        return `发布于${secondDiff}秒前`
    }
}

