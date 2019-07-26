// import Meta from '../components/meta'
// export default () => (
//   <div>
//     <Meta />
//     <p>hi there</p>
//   </div>
// )

import React from "react"
import Link from "next/link"
import { Nav, PageBody } from "../styles"

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </Nav>
      <PageBody>{children}</PageBody>
    </React.Fragment>
  )
}

export default Layout