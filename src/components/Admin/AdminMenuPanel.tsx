import React from 'react'
import { useTranslation } from 'react-i18next'
import AdminTabs from './AdminTabs'
import FormPageRow from '../common/FormPageRow/FormPageRow'

const AdminMenuPanel = () => {
    const { t } = useTranslation('common')
    return (
        <>
            <AdminTabs selectedTab="intro" />
            <FormPageRow>
                <h1>{t('Admin.intro')}</h1>
            </FormPageRow>
        </>
    )
}

export default AdminMenuPanel
