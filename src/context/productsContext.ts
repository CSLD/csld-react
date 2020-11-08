import React from 'react'
import { LoadedDataMo } from '../models/LoadedDataMo'
import { ProductsDataMo } from '../models/ProductsData'
import { getInitialLoadedData } from '../store/loadedData/reducer'

/**
 * Context containing products
 */
export const productsContext = React.createContext<LoadedDataMo<ProductsDataMo>>(getInitialLoadedData())
