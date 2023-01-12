import {
  GetAllCategories200Response,
  GetAllCategories500Response,
  UpdateCategory200Response,
  UpdateCategory500Response,
} from "./../../../dist/api/category/types"
import {
  CategoryApi,
  GetAllCategoriesResponse,
  GetCategory200Response,
  GetCategory500Response,
  GetCategoryResponse,
  PostCategory201Response,
  PostCategory404Response,
  PostCategoryResponse,
  UpdateCategoryResponse,
} from "../../../dist/api/category/types"
import { Api } from "../../../dist/models"
import { connection, pipeline, client } from "../../dbConection"
import { ServiceUtils } from "../../utils/utils"
let utils = new ServiceUtils()
export class CategoryImpl implements CategoryApi {
  async getAllCategories(): Promise<GetAllCategoriesResponse> {
    return new Promise<GetAllCategoriesResponse>((resolve, reject) => {
      try {
        //TODO:Here i need to do the pagination
        let sql = `SELECT * FROM PRODUCTS INNER JOIN CATEGORIES ON PRODUCTS.category=categories.id`
        connection.query(sql, (err, result: any) => {
          console.log(result)
          let finalResult = result.map((c: object) => JSON.stringify(c))
          if (err) throw err
          let res = <GetAllCategories200Response>{
            status: 200,
            body: finalResult,
          }
          return resolve(res)
        })
      } catch (err) {
        return reject(err)
      }
    }).catch((err) => {
      console.log(err)
      let res = <GetAllCategories500Response>{
        status: 500,
        body: { message: "Failed to get the categories and products" },
      }
      return res
    })
  }
  async updateCategory(
    id: number,
    request: Api.CategoryBody | undefined
  ): Promise<UpdateCategoryResponse> {
    try {
      return await new Promise((resolve, reject) => {
        //TODO: In the update endpoint i need to alter the table because the update at property is exists in the table column
        //TODO: Check the row exists in the table or not in the table
        try {
          utils.chekRowExistsOrNot(id).then((result) => {
            console.log("result", result)
            let count = result[0]["count(*)"]
            if (count == 0) {
              return reject(
                "Requested data is not exists! Please try again with another data!"
              )
            }
            let updatedAt = new Date()
              .toLocaleDateString()
              .split("/")
              .reverse()
              .join("-")
            let sql = `UPDATE CATEGORIES SET categoryName=?,subCategory=?,updateAt=? WHERE ID=?`
            let data = [request?.categoryName,request?.subcategory,updatedAt, id]
            connection.query(sql, data, (err, result) => {
              if (err) return reject(err)
              console.log(result)

              let res = <UpdateCategory200Response>{
                status: 200,
                body: {
                  message: "Successfully updated the category",
                },
              }
              connection.end()
              return resolve(res)
            })
          })
        } catch (err) {
          console.log(err)
          return reject(err)
        }
      })
    } catch (err_1) {
      console.log(err_1)
      let res_1 = <UpdateCategory500Response>{
        status: 500,
        body: {
          message: "Failed to update the category",
        },
      }
      return res_1
    }
  }

  async getCategory(id: number): Promise<GetCategoryResponse> {
    return new Promise<GetCategoryResponse>(async (resolve, reject) => {
      if (!id && typeof id !== "number") {
        return reject(new Error("Please give the id properly and try again!"))
      }
      //TODO:Check the data is exist in the cache before going into the database
      //TODO:If the data is exists in the cache then data from the cache and return the response
      //TODO: If not then query the database and store the resoponse into the cache and return the response
      let data = await client.SMEMBERS(`category:${id}`)
      console.log(data.length, data)
      if (data.length > 0) {
        let res = <GetCategory200Response>(<unknown>{
          status: 200,
          body: data,
        })
        console.log(new Date().getTime())
        return resolve(res)
      }
      let sql = `SELECT * FROM products INNER JOIN categories ON products.category = categories.id=${id}`
      connection.query(sql, (err, result: any) => {
        if (err) throw err
        console.log("result", typeof result, result, result.length)
        if (result.length) {
          //TODO:I'm seeting to the redis here and then i return the response
          //TODO:i've two ways here
          //1: using for loop. It takes time complexity O(n)
          //2: using pipelines in ioredis it take O(1) because it uses the batch to update the record
          let arrObj = result.map((rec: any) => JSON.stringify(rec))
          arrObj.forEach((rec: any) => pipeline.sadd(`category:${id}`, rec))
          pipeline.exec((err, _) => {
            if (err) throw err
          })
        }

        connection.end()

        let finalResult = result.map((r: any) => JSON.stringify(r))
        console.log("finalResult", finalResult)
        let res = <GetCategory200Response>(<unknown>{
          status: 200,
          body: finalResult,
        })
        return resolve(res)
      })
    }).catch((err) => {
      console.log(err)
      let res = <GetCategory500Response>{
        status: 500,
        body: {
          message: "Failed some thing went wrong!",
        },
      }
      return res
    })
  }

  async postCategory(
    request: Api.CategoryBody | undefined
  ): Promise<PostCategoryResponse> {
    return new Promise<PostCategoryResponse>((resolve, reject) => {
      let categoryName = request?.categoryName
      let subCategoryName = request?.subcategory
      try {
        utils
          .isUserAdmin(2, "praveenkusuluri08@gmail.com")
          .then((result) => {
            let count = result[0]["count(*)"]
            if (count == 0) {
              return reject(Error("Something went wrong!"))
            }
            utils.isTableExists("categories").then((result) => {
              console.log("first->here", result)
              let count = result[0]["count(*)"]
              if (count == 0) {
                return reject(new Error("Something went wrong!"))
              }
              let id = Math.floor(Math.random() * 50 + 1)
              let createdAt = new Date().toLocaleDateString()
              let sql = `INSERT INTO CATEGORIES SET ?`
              let category = {
                id,
                categoryName,
                subCategoryName,
                createdAt: createdAt.split("/").reverse().join("-"),
              }
              connection.query(sql, category, (err, result) => {
                if (err) throw err
                console.log("result", result)
                let res = <PostCategory201Response>{
                  status: 201,
                  body: {
                    message: "Category created successfully",
                    code: "201",
                    createdAt: new Date().toLocaleDateString(),
                  },
                }
                return resolve(res)
              })
              connection.end()
            })
          })
          .catch((err) => {
            return reject(new Error(err))
          })
      } catch (err: any) {
        console.log("🙂", err)
        let res = <PostCategory404Response>{
          status: 404,
          body: {
            message:
              "Failed! Some thing went wrong, please check and try again",
            code: "404",
          },
        }
        console.log("here")
        return resolve(res)
      }
    }).catch((err) => {
      console.log("err🙂", err)
      let res = <PostCategory404Response>{
        status: 404,
        body: {
          message:
            "Failed! Some thing went wrong, please check and try again with new request",
          code: "404",
        },
      }
      return res
    })
  }
}
