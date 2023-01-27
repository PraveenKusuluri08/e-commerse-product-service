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

import { Express } from 'express'
import passport from 'passport'
import * as t from './types'
import * as v from '../../validation'
import { Api } from '../../models'

export default function(app: Express, impl: t.CategoryApi) {
	app.get(
		'/category',
		function (req, res) {
			try {
				impl.getAllCategories().then(function (response) {
					if (response.status === 200) {
						let body: any
						try {
							body = v.arrayToJson(v.stringToJson)('response', response.body)
						} catch (error) {
							console.error('Invalid response body in category.getAllCategories', error)
							res.status(500)
							res.send()
							return
						}

						res.status(200)
						res.send(body)
						return
					}
					if (response.status === 500) {
						let body: any
						try {
							body = v.modelApiGetAllCategories500ResponseToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in category.getAllCategories', error)
							res.status(500)
							res.send()
							return
						}

						res.status(500)
						res.send(body)
						return
					}

					console.log('Unsupported response in category.getAllCategories', response)
					res.status(500)
					res.send()
				}).catch(function (error) {
					console.error('Unexpected error in category.getAllCategories', error.stack || error)
					res.status(500)
					res.send()
				})
			} catch (error) {
				/* Catch validation errors */
				res.status(400)
				res.send(error)
			}
		}
	)

	app.post(
		'/category',
		function (req, res) {
			try {
				function __body() {
					const __contentType = req.get('Content-Type')
					const __mimeType = __contentType ? __contentType.replace(/;.*/, '') : undefined

					if (__mimeType === 'application/json') {
						return v.modelApiCategoryBodyFromJson('body', req.body)
					}
					console.error(`Invalid request content type: ${__contentType}`)
					throw new Error(`Invalid request content type: ${__contentType}`)
				}

				impl.postCategory(__body()).then(function (response) {
					if (response.status === 201) {
						let body: any
						try {
							body = v.modelApiCategoryCreateResponseToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in category.postCategory', error)
							res.status(500)
							res.send()
							return
						}

						res.status(201)
						res.send(body)
						return
					}
					if (response.status === 404) {
						let body: any
						try {
							body = v.modelApiCategoryCreationFailureToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in category.postCategory', error)
							res.status(500)
							res.send()
							return
						}

						res.status(404)
						res.send(body)
						return
					}

					console.log('Unsupported response in category.postCategory', response)
					res.status(500)
					res.send()
				}).catch(function (error) {
					console.error('Unexpected error in category.postCategory', error.stack || error)
					res.status(500)
					res.send()
				})
			} catch (error) {
				/* Catch validation errors */
				res.status(400)
				res.send(error)
			}
		}
	)

	app.get(
		'/category/:id',
		function (req, res) {
			try {
				impl.getCategory(v.parseInteger('params.id', req.params['id'])).then(function (response) {
					if (response.status === 200) {
						let body: any
						try {
							body = v.arrayToJson(v.stringToJson)('response', response.body)
						} catch (error) {
							console.error('Invalid response body in category.getCategory', error)
							res.status(500)
							res.send()
							return
						}

						res.status(200)
						res.send(body)
						return
					}
					if (response.status === 500) {
						let body: any
						try {
							body = v.modelApiGetCategory500ResponseToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in category.getCategory', error)
							res.status(500)
							res.send()
							return
						}

						res.status(500)
						res.send(body)
						return
					}

					console.log('Unsupported response in category.getCategory', response)
					res.status(500)
					res.send()
				}).catch(function (error) {
					console.error('Unexpected error in category.getCategory', error.stack || error)
					res.status(500)
					res.send()
				})
			} catch (error) {
				/* Catch validation errors */
				res.status(400)
				res.send(error)
			}
		}
	)

	app.put(
		'/category/:id',
		function (req, res) {
			try {
				function __body() {
					const __contentType = req.get('Content-Type')
					const __mimeType = __contentType ? __contentType.replace(/;.*/, '') : undefined

					if (__mimeType === 'application/json') {
						return v.modelApiCategoryBodyFromJson('body', req.body)
					}
					console.error(`Invalid request content type: ${__contentType}`)
					throw new Error(`Invalid request content type: ${__contentType}`)
				}

				impl.updateCategory(v.parseInteger('params.id', req.params['id']), __body()).then(function (response) {
					if (response.status === 200) {
						let body: any
						try {
							body = v.modelApiUpdateCategory200ResponseToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in category.updateCategory', error)
							res.status(500)
							res.send()
							return
						}

						res.status(200)
						res.send(body)
						return
					}
					if (response.status === 500) {
						let body: any
						try {
							body = v.modelApiUpdateCategory500ResponseToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in category.updateCategory', error)
							res.status(500)
							res.send()
							return
						}

						res.status(500)
						res.send(body)
						return
					}

					console.log('Unsupported response in category.updateCategory', response)
					res.status(500)
					res.send()
				}).catch(function (error) {
					console.error('Unexpected error in category.updateCategory', error.stack || error)
					res.status(500)
					res.send()
				})
			} catch (error) {
				/* Catch validation errors */
				res.status(400)
				res.send(error)
			}
		}
	)

}
