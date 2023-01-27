import * as t from '../api/products/types'
import { Api } from '../models'

async function imageUploadProduct(request: Api.ImageUploadProductRequest.MultipartFormData | undefined): Promise<t.ImageUploadProductResponse> {
	throw 'Unimplemented'
}

async function updateProduct(id: string, request: Api.CreateProduct | undefined): Promise<t.UpdateProductResponse> {
	throw 'Unimplemented'
}

async function createProduct(request: Api.CreateProduct | undefined): Promise<t.CreateProductResponse> {
	throw 'Unimplemented'
}


const api: t.ProductsApi = {
	imageUploadProduct,
	updateProduct,
	createProduct,
}

export default api
