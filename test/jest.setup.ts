import dotenv from 'dotenv'
import { setConfig } from 'next/config'
import '@testing-library/jest-dom'

dotenv.config({ path: '.env.test' })

setConfig({
    publicRuntimeConfig: {
        API_URL: process.env.API_URL,
        API_KEY: process.env.API_KEY,
    },
})

// Mock translation to not translate
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (arg: any) => arg,
    }),
}))
