import React from 'react'
import { NextPage } from 'next'
import { PageHeader } from '../../src/components/common/PageHeader/PageHeader'

interface Props {}
interface InitialProps {}

const HomePage: NextPage<Props, InitialProps> = () => <PageHeader />

HomePage.getInitialProps = async () => ({ namespacesRequired: ['common'] })

export default HomePage
