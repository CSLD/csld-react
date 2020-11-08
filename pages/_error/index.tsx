import * as React from 'react'
import { NextPage } from 'next'
import { WithTranslation } from 'next-i18next'

import { withTranslation } from 'server/i18n'

interface ErrorPageProps extends WithTranslation {
    statusCode?: number
}

interface ErrorPageInitialProps {
    namespacesRequired: string[]
}

const Error: NextPage<ErrorPageProps, ErrorPageInitialProps> = ({ t, statusCode }) => {
    return (
        <div>
            {t('common:Error')}
            {statusCode}
        </div>
    )
}

Error.getInitialProps = async ({ res, err }) => {
    let statusCode

    if (res) {
        ;({ statusCode } = res)
    } else if (err) {
        ;({ statusCode } = err)
    }

    return {
        namespacesRequired: ['common'],
        statusCode,
    }
}

export default withTranslation('common')(Error)
