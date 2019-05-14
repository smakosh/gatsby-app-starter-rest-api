import React from 'react'
import { Link } from 'gatsby'
import Layout from 'components/common/Layout'
import SEO from 'components/common/Seo'

export default () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div className="container center-text">
      <h1>This could be the landing page</h1>
      <Link to="/app/">Navigate to the app</Link>
    </div>
  </Layout>
)
