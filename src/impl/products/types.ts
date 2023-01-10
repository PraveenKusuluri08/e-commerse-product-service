import {
  CreateProduct201Response,
  CreateProduct500Response,
  CreateProductResponse,
  ImageUploadProduct200Response,
  ImageUploadProduct500Response,
  ImageUploadProductResponse,
  ProductsApi,
} from "../../../dist/api/products/types"
import { Api } from "../../../dist/models"
import * as crypto from "crypto"
import { connection } from "../../dbConection"
import FormData from "form-data"
import axios from "axios"
export class ProductApiImpl implements ProductsApi {
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
            let sql = `UPDATE products SET images = '${images}'  WHERE itemId='7641382736'`
            connection.query(sql,locations, (err, rows) => {
              if (err){
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
    return new Promise<CreateProductResponse>((resolve, reject) => {
      try {
        //TODO:Need to use the image upload endpoint which is deployed to lambda
        const itemId = crypto.randomBytes(5).toString("hex").toUpperCase()
        //TODO:Approach
        //TODO:create a product without the images and create a edpoint to update the images using the seperate endpoint
        //TODO:Images would be now the empty array with strings
        let sql = `INSERT INTO products (itemId,description,price,discount,rating,category,itemName) VALUES(?,?,?,?,?,?,?)`
        const values = [
          itemId,
          request?.description,
          request?.price,
          request?.discount,
          request?.rating,
          request?.category,
          request?.itemName,
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
