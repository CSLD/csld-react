import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { TabDefinition, Tabs } from '../common/Tabs/Tabs'

type Tab = 'profile' | 'settings' | 'changePassword'

interface Props {
    readonly selectedTab: Tab
    readonly profileOnly?: boolean
}

const UserProfileTabs = ({ selectedTab, profileOnly }: Props) => {
    const router = useRouter()
    const handleSelectTab = (tab: Tab) => {
        if (tab !== selectedTab) {
            const id = tab === 'profile' ? 'current' : tab
            router.push({ pathname: '/profile', query: { id } }, `/profile/${id}`)
        }
    }
    const { t } = useTranslation('common')

    const tabs: Array<TabDefinition<Tab>> = [
        {
            key: 'profile',
            title: t('UserDetail.profile'),
        },
    ]
    if (!profileOnly) {
        tabs.push({
            key: 'settings',
            title: t('UserDetail.settings'),
        })
        tabs.push({
            key: 'changePassword',
            title: t('UserDetail.changePassword'),
        })
    }

    return <Tabs selectedTab={selectedTab} tabs={tabs} onSelectTab={handleSelectTab} />
}

export default UserProfileTabs
