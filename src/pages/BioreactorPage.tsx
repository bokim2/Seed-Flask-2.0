import React from 'react'
import { InnerPageContainer, PageContainer } from '../styles/UtilStyles'
import LoaderCircular from '../ui/LoaderCircular'

export default function BioreactorPage() {
  return (
  <PageContainer>
    <InnerPageContainer>
    <LoaderCircular/>
    </InnerPageContainer>
  </PageContainer>
  )
}
