import * as t from '../api/category/types'
import { Api } from '../models'

async function getAllCategories(): Promise<t.GetAllCategoriesResponse> {
	throw 'Unimplemented'
}

async function postCategory(request: Api.CategoryBody | undefined): Promise<t.PostCategoryResponse> {
	throw 'Unimplemented'
}

async function getCategory(id: number): Promise<t.GetCategoryResponse> {
	throw 'Unimplemented'
}

async function updateCategory(id: number, request: Api.CategoryBody | undefined): Promise<t.UpdateCategoryResponse> {
	throw 'Unimplemented'
}


const api: t.CategoryApi = {
	getAllCategories,
	postCategory,
	getCategory,
	updateCategory,
}

export default api
