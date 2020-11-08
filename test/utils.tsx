import { LoadedDataMo } from '../src/models/LoadedDataMo'

/**
 * Create proper LoadedDataMo with this payload
 *
 * @param data Data payload
 */
export const mockLoadedData = <T,>(data: T): LoadedDataMo<T> => ({
    data,
    error: false,
    loading: false,
})
