# Products

## Operations

### imageUploadProduct

```http
POST /product/imageupload
```

Images for the product created

### updateProduct

```http
PUT /product/{id}
```

Update Product

### createProduct

```http
POST /products
```

To create as the admin side

## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
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
```
