import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'
const path = require('path')

i18n.use(initReactI18next)
    .use(Backend)
    .init({
        fallbackLng: 'cs',
        debug: true,
        simplifyPluralSuffix: false,
        ns: ['common'],
        interpolation: {
            escapeValue: true,
        },
        backend: {
            loadPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.json'),
            addPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.missing.json'),
        },
        react: {
            useSuspense: false,
        },
    })

export const withI18next = () => (story: any) => {
    return <I18nextProvider i18n={i18n}>{story()}</I18nextProvider>
}
