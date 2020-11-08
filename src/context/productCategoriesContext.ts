import React from 'react'
import { LoadedDataMo } from '../models/LoadedDataMo'
import { getInitialLoadedData } from '../store/loadedData/reducer'
import { ProductCategoryMo } from '../models/ProductCategoryMo'

/**
 * Context containing product categories
 */
export const productCategoriesContext = React.createContext<LoadedDataMo<ProductCategoryMo[]>>(getInitialLoadedData())
