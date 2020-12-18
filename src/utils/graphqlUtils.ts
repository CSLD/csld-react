/**
 * Convert file input value from the format stored by FormFileInput to graphql UploadedFileInput
 */
export const convertFileInput = (fileInput?: string) => {
    if (!fileInput) {
        return undefined
    }

    const pp = fileInput.split('\t')

    return {
        fileName: pp[0],
        contents: pp[1],
    }
}

/**
 * Convert date input value from DD.MM.YYYY format to our date
 */
export const convertDateInput = (dateInput?: string) => {
    if (!dateInput) {
        return undefined
    }

    const d = dateInput.split('.')
    return `${d[2]}-${d[1]}-${d[0]}`
}

/**
 * Convert date from graphql ISO format to local format
 *
 * @param date Graphql date
 *
 * @return Local date
 */
export const convertDateFromGraphql = (date: string | null | undefined) => {
    if (!date) {
        return undefined
    }

    const d = date.split('-')
    return `${d[2]}.${d[1]}.${d[0]}`
}
