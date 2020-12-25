import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { PageHeader } from '../../src/components/common/PageHeader/PageHeader'
import { PageFooter } from '../../src/components/common/PageFooter/PageFooter'
import GameEditPagePanel from '../../src/components/GameEdit/GameEditPagePanel'

interface Props {}
interface InitialProps {}

const GameEditPage: NextPage<Props, InitialProps> = () => {
    const router = useRouter()

    return (
        <>
            <PageHeader />
            <GameEditPagePanel />
            <PageFooter />
        </>
    )
}

GameEditPage.getInitialProps = async () => ({ namespacesRequired: ['common'] })

export default GameEditPage
