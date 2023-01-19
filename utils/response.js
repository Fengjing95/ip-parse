/*
 * @Date: 2023-01-19 11:26:39
 * @Author: 枫
 * @LastEditors: 枫
 * @description: description
 * @LastEditTime: 2023-01-19 11:29:13
 */
/**
 * 响应数据格式化
 * @param {object} res 
 * @param {string} msg 
 */
export function responseFormat(res, msg = '') {
  return {
    code: 0,
    msg,
    data: res
  }
}

/**
 * 错误响应格式化
 * @param {number} code 
 * @param {string} msg 
 */
export function errorFormat(code, msg) {
  return {
    code,
    msg
  }
}
