import React from 'react'
import { NextPage } from 'next'
import { GameDetailPanel } from 'src/components/GameDetail/GameDetailPanel'
import { useRouter } from 'next/router'
import { PageHeader } from '../../src/components/common/PageHeader/PageHeader'
import { PageFooter } from '../../src/components/common/PageFooter/PageFooter'

interface Props {}
interface InitialProps {}

const GameDetailPage: NextPage<Props, InitialProps> = () => {
    const router = useRouter()

    return (
        <>
            <PageHeader />
            <GameDetailPanel gameId={router.query.id as string} />
            <PageFooter />
        </>
    )
}

GameDetailPage.getInitialProps = async () => ({ namespacesRequired: ['common'] })

export default GameDetailPage
