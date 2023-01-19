/*
 * @Date: 2023-01-18 17:00:09
 * @Author: 枫
 * @LastEditors: 枫
 * @description: description
 * @LastEditTime: 2023-01-19 12:20:01
 */
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import ipdb from 'ipip-ipdb'

const __dirname = dirname(fileURLToPath(import.meta.url))
const client = new ipdb.City(resolve(__dirname, '../db/ipipfree.ipdb'))

/**
 * 校验是否符合 IP 格式
 * @param {string} ip 
 * @returns 
 */
export function isIP(ip) {
  return /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/.test(ip)
}

/**
 * 解析 IP 地址
 * @param {string} ip 
 */
export function parseIP(ip) {
  const res = client.findInfo(ip, 'CN')
  return res
}
