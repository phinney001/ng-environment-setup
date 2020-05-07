// 联系方式：座机+手机号
export const contact = /^((0\d{2,3}-?\d{7,8})|(1[3456789]\d{9}))$/

// 手机号码
export const phone = /^1(3|4|5|6|7|8|9)\d{9}$/

// 邮箱
// tslint:disable-next-line
export const email = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

// 网址
export const url = /^(?:(?:https?|ftp):\/\/)?(?:[\da-z.-]+)\.(?:[a-z.]{2,6})(?:\/\w\.-]*)*\/?/

// 邮政编码
export const code = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/

// 银行卡号
export const bank = /^[1-9]\d{9,29}$/

