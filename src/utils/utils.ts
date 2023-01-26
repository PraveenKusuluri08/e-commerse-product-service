import mysql from "mysql2"
import { PostCategoryResponse } from "../../dist/api/category/types"
import { connection } from "../dbConection"
import { IVerifyOptions } from "passport-http-bearer"
import { verify } from "jsonwebtoken"
import qrcode from "qrcode"
interface UtilsFunctions {
  isUserAdmin(
    role: number,
    email: string
  ): Promise<Array<{ "count(*)": number }>>
  isTableExists(
    tableName: string
  ): Promise<Array<{ "count(*)": number } | PostCategoryResponse>>
}
export class ServiceUtils implements UtilsFunctions {
  async isUserAdmin(
    role: number,
    email: string
  ): Promise<Array<{ "count(*)": number }>> {
    return new Promise((resolve, reject) => {
      try {
        let values = [email, role]
        let sql = `select count(*) from users where email=? and role=?`
        connection.query(sql, values, (err, result: any) => {
          if (err) throw err
          resolve(result)
        })
      } catch (err) {
        reject(err)
        throw err
      }
    })
  }
  async isTableExists(tableName: string): Promise<any | PostCategoryResponse> {
    return new Promise((resolve, reject) => {
      try {
        let sql = `select count(*) from ${tableName}`
        connection.query(sql, (err, result) => {
          if (err) {
            console.log("first->😂", err)
            throw err
          }
          return resolve(result)
        })
      } catch (err) {
        console.log("😀", err)
        return reject(err)
      }
    })
  }
  async chekRowExistsOrNot(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        let sql = `SELECT COUNT(*) FROM CATEGORIES WHERE ID=${id}`
        connection.query(sql, (err, result) => {
          if (err) throw err
          resolve(result)
        })
      } catch (err) {
        console.log(err)
        return reject(err)
      }
    })
  }
  static async validateToken(
    token: string,
    done: (
      error: any,
      user?: any,
      options?: string | IVerifyOptions | undefined
    ) => void
  ) {
    console.log("here")
    if (token.length === 0) {
      done("Invalid token! Please provide token")
      return
    }
    let decoded = verify(token, "ecommerse_scecret")
    done(null, decoded)
  }
  static async generate_qr_code(product_id: string) {
    return new Promise((resolve, reject) => {
      qrcode.toString(product_id, { type: "terminal" }, (err, url) => {
        if (err) {
          return reject(err)
        }
        console.log(url)
        return resolve(url)
      })
    }).catch((err) => {
      console.log(err)
      throw err
    })
  }
  static async generate_sku(
    itemName: string,
    itemId: string,
    category_id: number
  ) {
    let productNameSku = itemName.slice(0, 3)
    let itemIdSku = itemId.slice(0, 3)
    return Math.random().toString(30).substring(2, 4).toUpperCase() +
      "-" +
      `${productNameSku}-` +
      `${itemIdSku}-` +
      `${category_id}-` +
      Math.random().toString(15).substring(2, 12).toUpperCase()
  }
}
