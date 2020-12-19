import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { PageHeader } from '../../src/components/common/PageHeader/PageHeader'
import { PageFooter } from '../../src/components/common/PageFooter/PageFooter'
import UserSettingsPanel from '../../src/components/Profile/UserSettingsPanel'
import CurrentUserProfileContainer from '../../src/components/Profile/CurrentUserProfileContainer'
import OtherUserProfileContainer from '../../src/components/Profile/OtherUserProfileContainer'
import ChangePasswordPanel from '../../src/components/Profile/ChangePasswordPanel'

interface Props {}
interface InitialProps {}

const Profile: NextPage<Props, InitialProps> = () => {
    const router = useRouter()

    const id = router.query.id as string
    const idNum = parseInt(id, 10)

    return (
        <>
            <PageHeader />
            {id === 'settings' && <UserSettingsPanel />}
            {id === 'current' && <CurrentUserProfileContainer />}
            {id === 'changePassword' && <ChangePasswordPanel />}
            {idNum && <OtherUserProfileContainer userId={id} />}
            <PageFooter />
        </>
    )
}

Profile.getInitialProps = async () => ({ namespacesRequired: ['common'] })

export default Profile
