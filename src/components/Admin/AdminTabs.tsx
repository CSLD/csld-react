import React from 'react'
import { TabDefinition, Tabs } from '../common/Tabs/Tabs'

type AdminTab = 'intro' | 'users' | 'labels' | 'ratingStats' | 'commentStats' | 'selfRating'

interface Props {
    readonly selectedTab: AdminTab
}

const tabs: Array<TabDefinition<AdminTab>> = [
    {
        key: 'intro',
        title: { key: 'Admin.tabIntro' },
    },
    {
        key: 'users',
        title: { key: 'Admin.tabUsers' },
    },
    {
        key: 'labels',
        title: { key: 'Admin.tabLabels' },
    },
    {
        key: 'ratingStats',
        title: { key: 'Admin.tabRatingStats' },
    },
    {
        key: 'commentStats',
        title: { key: 'Admin.tabCommentState' },
    },
    {
        key: 'selfRating',
        title: { key: 'Admin.tabSelfRating' },
    },
]

const AdminTabs = ({ selectedTab }: Props) => <Tabs tabs={tabs} selectedTab={selectedTab} />

export default AdminTabs
