/* eslint-disable */
// tslint:disable
/**
 * ECOMMERSE PROJECT MICROSERVICES
 * 
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator+.
 * https://github.com/karlvr/openapi-generator-plus
 * Do not edit the class manually.
 */

export namespace Api {
	/**
	 * <p>Body to create a category</p>
	 */
	export interface CategoryBody {
		categoryName: string;
		subcategory: string;
	}

	/**
	 * <p>Used for the seeing the category creation status</p>
	 */
	export interface CategoryCreateResponse {
		code?: string;
		message?: string;
		createdAt?: string;
		createdBy?: string;
	}

	/**
	 * <p>Failed to create a category! Some thing went wrong</p>
	 */
	export interface CategoryCreationFailure {
		code?: string;
		message?: string;
	}

	/**
	 * <p>Body to create a product</p>
	 */
	export interface CreateProduct {
		itemName?: string;
		description?: string;
		/**
		 * @type {number}
		 * @memberof CreateProduct
		 */
		price?: number;
		/**
		 * @type {number}
		 * @memberof CreateProduct
		 */
		discount_id?: number;
		/**
		 * @type {number}
		 * @memberof CreateProduct
		 */
		rating?: number;
		/**
		 * @type {number}
		 * @memberof CreateProduct
		 */
		category_id?: number;
		inventory_id?: string;
	}

	export interface CreateProduct201Response {
		message?: string;
	}

	export interface CreateProduct500Response {
		message?: string;
	}

	export interface GetAllCategories500Response {
		message?: string;
	}

	export interface GetCategory500Response {
		message?: string;
	}

	/**
	 * <p>Successful response for the single record</p>
	 */
	export interface GetRecord {
		data?: Api.GetRecord.Data;
	}
	
	/**
	 * @export
	 * @namespace GetRecord
	 */
	export namespace GetRecord {
		export interface Data {
			categoryName?: string;
			id?: string;
			createAt?: string;
			itemId?: string;
			description?: string;
			/**
			 * @type {number}
			 * @memberof Data
			 */
			price?: number;
			/**
			 * @type {number}
			 * @memberof Data
			 */
			rating?: number;
			/**
			 * @type {number}
			 * @memberof Data
			 */
			category?: number;
			images?: string[];
			itemName?: string;
		}
	
	}

	export interface ImageUploadProduct200Response {
		message?: string;
	}

	export interface ImageUploadProduct500Response {
		message?: string;
	}

	export interface ImageUploadProductRequest {
		file: string | Buffer;
		itemId?: string;
	}
	
	/**
	 * @export
	 * @namespace ImageUploadProductRequest
	 */
	export namespace ImageUploadProductRequest {
		export interface MultipartFormData {
			file: Api.ImageUploadProductRequest.MultipartFormData.FilePart;
			itemId?: string;
		}
		
		/**
		 * @export
		 * @namespace MultipartFormData
		 */
		export namespace MultipartFormData {
			export interface FilePart {
				value: string | Buffer;
				filename?: string;
			}
		
		}
	
	}

	export interface UpdateCategory200Response {
		message?: string;
	}

	export interface UpdateCategory500Response {
		message?: string;
	}

	export interface UpdateProduct200Response {
		message?: string;
	}

	export interface UpdateProduct500Response {
		message?: string;
	}

}