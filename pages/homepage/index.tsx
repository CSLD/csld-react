import React from 'react'
import { NextPage } from 'next'
import { HomePagePanel } from '../../src/components/HomePage/HomePagePanel'
import { getBaseUrl } from '../../src/utils/urlUtils'

interface Props {
    readonly baseUrl: string
}
interface InitialProps {}

const HomePage: NextPage<Props, InitialProps> = ({ baseUrl }) => <HomePagePanel baseUrl={baseUrl} />

HomePage.getInitialProps = async ({ req }) => ({ namespacesRequired: ['common'], baseUrl: getBaseUrl(req) })

export default HomePage
