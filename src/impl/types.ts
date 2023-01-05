import {ApiImplementation} from "../../dist/types"
import { CategoryImpl } from "./category/types"

export class apiImpl implements ApiImplementation{
    category:CategoryImpl = new CategoryImpl
}