import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { PageHeader } from 'src/components/common/PageHeader/PageHeader'
import { PageFooter } from 'src/components/common/PageFooter/PageFooter'
import GameEditPagePanel from 'src/components/GameEdit/GameEditPagePanel'
import SignInRequiredWrapper from 'src/components/common/SignInRequiredWrapper/SignInRequiredWrapper'

interface Props {}
interface InitialProps {}

const GameEditPage: NextPage<Props, InitialProps> = () => {
    const router = useRouter()

    return (
        <>
            <PageHeader />
            <SignInRequiredWrapper>
                <GameEditPagePanel gameId={router.query.id as string} />
            </SignInRequiredWrapper>
            <PageFooter />
        </>
    )
}

GameEditPage.getInitialProps = async () => ({ namespacesRequired: ['common'] })

export default GameEditPage
