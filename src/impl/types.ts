import { ProductApiImpl } from './products/types'
import {ApiImplementation} from "../../dist/types"
import { CategoryImpl } from "./category/types"

export class apiImpl implements ApiImplementation{
    products: ProductApiImpl = new ProductApiImpl
    category:CategoryImpl = new CategoryImpl
}