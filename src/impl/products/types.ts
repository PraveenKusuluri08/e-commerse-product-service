import { UpdateProduct500Response } from "./../../../dist/api/products/types"
import {
  CreateProduct201Response,
  CreateProduct500Response,
  CreateProductResponse,
  ImageUploadProduct200Response,
  ImageUploadProduct500Response,
  ImageUploadProductResponse,
  ProductsApi,
  UpdateProduct200Response,
  UpdateProductResponse,
} from "../../../dist/api/products/types"
import { Api } from "../../../dist/models"
import * as crypto from "crypto"
import { connection } from "../../dbConection"
import FormData from "form-data"
import axios from "axios"
import { ServiceUtils } from "../../utils/utils"
export class ProductApiImpl implements ProductsApi {
  async updateProduct(
    id: string,
    request: Api.CreateProduct | undefined
  ): Promise<UpdateProductResponse> {
    return new Promise<UpdateProductResponse>((resolve, reject) => {
      try {
        let sql = `UPDATE products SET itemName=?,description=?, price =?,discount_id=?,rating=?,category_id=?,inventory_id=? WHERE itemId='${id}'`
        let values = [
          request?.itemName,
          request?.description,
          request?.price,
          request?.discount_id,
          request?.rating,
          request?.category_id,
          request?.inventory_id,
        ]
        connection.query(sql, values, (err, rows) => {
          if (err) throw err
          let res = <UpdateProduct200Response>{
            status: 200,
            body: {
              message: "Product Updated successfully",
            },
          }
          return resolve(res)
        })
      } catch (err) {
        let res = <UpdateProduct500Response>{
          status: 500,
          body: {
            message: "Internal Server Error",
          },
        }
        return resolve(res)
      }
    }).catch((err) => {
      console.log(err)
      let res = <UpdateProduct500Response>{
        status: 500,
        body: {
          message: "Internal Server Error",
        },
      }
      return res
    })
  }

  async imageUploadProduct(
    request: Api.ImageUploadProductRequest | any
  ): Promise<ImageUploadProductResponse> {
    return await new Promise(async (resolve, reject) => {
      const imageUrls: string[] = []
      const formData: any = new FormData()
      formData.append("files", JSON.stringify([request.files]))
      formData.append("itemId", request.itemId)

      try {
        console.log("first->", request.files)

        axios
          .post(
            "https://qk4inqahkb.execute-api.us-east-1.amazonaws.com/prod/app/multipleimagesuploadcommerseproducts",
            {
              data: formData._streams,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )

          .then((response) => {
            console.log("response.data", response.data)
            let { Data } = response.data
            let locations: string[] = []
            for (let index = 0; index < Data.length; index++) {
              locations.push(Data[index].Location)
            }
            console.log("first->", locations)
            let images = JSON.stringify(locations)
            let sql = `UPDATE products SET images = '${images}'  WHERE itemId='${request.itemId}'`
            connection.query(sql, locations, (err, rows) => {
              if (err) {
                console.log("err->🥵", err)
              }
              console.log("rows", rows)
              let res = <ImageUploadProduct200Response>{
                status: 200,
                body: {
                  message: "Images are attached to the product successfully",
                },
              }
              return resolve(res)
            })
          })
          .catch((err) => {
            console.log(err)
          })
      } catch (err) {
        console.log(err)
        let res_1 = <ImageUploadProduct500Response>{
          status: 500,
          body: {
            message: "Failed to attach images for the product created",
          },
        }
        return res_1
      }
    })
  }
  async createProduct(
    request: Api.CreateProduct | undefined
  ): Promise<CreateProductResponse> {
    return new Promise<CreateProductResponse>(async (resolve, reject) => {
      try {
        //TODO:Need to use the image upload endpoint which is deployed to lambda
        const itemId = crypto.randomBytes(5).toString("hex").toUpperCase()
        //TODO:Approach
        //TODO:create a product without the images and create a edpoint to update the images using the seperate endpoint
        //TODO:Images would be now the empty array with strings
        //TODO: Generted SKU and Generated QR codes store in the sql table
        const SKU = await ServiceUtils.generate_sku(
          request?.itemName ?? "PRD",
          itemId,
          request?.category_id ?? 0
        )
        const qrCode = await ServiceUtils.generate_qr_code(itemId)
        let sql = `INSERT INTO products (itemId,itemName,description,SKU,price,discount_id,rating,category_id,inventory_id,qr_code) VALUES(?,?,?,?,?,?,?,?,?,?)`
        const values = [
          itemId,
          request?.itemName,
          request?.description,
          SKU,
          request?.price,
          request?.discount_id,
          request?.rating,
          request?.category_id,
          request?.inventory_id,
          qrCode,
        ]
        connection.query(sql, values, (result) => {
          console.log(result)
          let res = <CreateProduct201Response>{
            status: 201,
            body: {
              message: "Product created successfully",
            },
          }
          return resolve(res)
        })
      } catch (err) {
        console.log("err->🥵", err)
        return reject(err)
      } finally {
        connection.end()
      }
    }).catch((err) => {
      console.log("err->💢", err)
      let res = <CreateProduct500Response>{
        status: 500,
        body: {
          message: "Failed to create product please try again",
        },
      }
      return res
    })
  }
}
