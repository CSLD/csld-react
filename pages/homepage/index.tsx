import React from 'react'
import { NextPage } from 'next'
import { PageHeader } from '../../src/components/common/PageHeader/PageHeader'
import { HomePagePanel } from '../../src/components/HomePage/HomePagePanel'
import { PageFooter } from '../../src/components/common/PageFooter/PageFooter'

interface Props {}
interface InitialProps {}

const HomePage: NextPage<Props, InitialProps> = () => (
    <>
        <PageHeader />
        <HomePagePanel />
        <PageFooter />
    </>
)

HomePage.getInitialProps = async () => ({ namespacesRequired: ['common'] })

export default HomePage
