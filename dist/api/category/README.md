# Category

## Operations

### getAllCategories

```http
GET /category
```

To get all the categeries and their products

### postCategory

```http
POST /category
```

This helps to create a category

### getCategory

```http
GET /category/{id}
```

For to get the requested category from the table and based on that query any product is matched getting that record from the database

### updateCategory

```http
PUT /category/{id}
```

For to update the category

## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
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
```
