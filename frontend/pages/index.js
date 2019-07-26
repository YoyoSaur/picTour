// import React from 'react';
// import Axios from 'axios'

// class HelloUA extends React.Component {
//   // static async getInitialProps({ req }) {
//   //   const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
//   //   const piece = await Axios.get('http://127.0.0.1:3001/piece?piece_id=5cf1a7fdfc69721fb1ceb683')
//   //   console.log(piece.data)
//   //   return { userAgent, piece: piece.data };
//   // }
//   //{this.props.userAgent} {JSON.stringify(this.props.piece)}

//   render() {
//     return <div>Hello World </div>;
//   }
// }

// export default HelloUA;

import React from "react"
import Layout from "../layouts/main"
//import Tabs from "../components/Tabs"

const PageOne = props => {
  return (
    <Layout>Tabs component will be displayed here</Layout>
  )
}
export default PageOne