import { TFunction } from 'i18next'

const emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const integerRe = /^(0|([1-9][0-9]*))$/

type Validator = (input?: string) => string | undefined

type ValidatorMap<T, U extends keyof T> = {
    [key in U]: Validator | Validator[] | undefined
}

interface ResultMap {
    [key: string]: string | undefined
}

const isStringOrUndefined = (input: any): input is string | undefined =>
    input === undefined || typeof input === 'string'

export const validateRequired = (input?: string) => (input ? undefined : 'Errors.required')

export const validateEmail = (input?: string) => (!input || emailRe.test(input) ? undefined : 'Errors.emailRequired')

export const validatePositiveInteger = (input?: string) =>
    !input || integerRe.test(input) ? undefined : 'Errors.integerRequired'

export const validateWithValidators = <T extends object, K extends keyof T>(
    data: T,
    validators: ValidatorMap<T, K>,
    t: TFunction,
): ResultMap => {
    return Object.keys(validators).reduce((map, key) => {
        const input = data[key as K]
        if (isStringOrUndefined(input)) {
            const val = validators[key as K] as Validator | Validator[]

            if (val) {
                const result = Array.isArray(val)
                    ? val.reduce<string | undefined>((error, validator) => error || validator(input), undefined)
                    : val(input)
                // eslint-disable-next-line no-param-reassign
                map[key] = result ? t(result) : undefined
            }
        }

        return map
    }, {} as ResultMap)
}
