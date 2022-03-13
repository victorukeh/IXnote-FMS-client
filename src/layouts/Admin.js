import React, {useEffect, useState} from 'react'
import { useLocation, Route, Switch, Redirect } from 'react-router-dom'
import { Container } from 'reactstrap'
import AdminNavbar from 'components/Navbars/AdminNavbar.js'
import AdminFooter from 'components/Footers/AdminFooter.js'
import Sidebar from 'components/Sidebar/Sidebar.js'
import routes from 'routes.js'
import { useDataLayerValue } from '../DataLayer'

const Admin = (props) => {
  const [{photos}, dispatch] = useDataLayerValue()
  // const [photos, setPhotos] = useState([])
  console.log(photos)  
  const mainContent = React.useRef(null)
  const location = useLocation()

  React.useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
    mainContent.current.scrollTop = 0
  }, [location])

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        )
      } else {
        return null
      }
    })
  }

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name
      }
    }
    return 'Brand'
  }


  useEffect(() => {
    fetch('http://localhost:2000/photos')
      .then((res) => res.json())
      .then((json) => {
        if(json.message){
          console.log('No Files')
          dispatch({
            type: 'SET_PHOTOS',
            photos: [],
          })
        }else{
          dispatch({
            type: 'SET_PHOTOS',
            photos: json,
          })
        }
      })  
  }, [])
  
  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: '/admin/index',
          imgSrc: require('../assets/img/brand/argon-react.png').default,
          imgAlt: '...',
        }}
      />
      <div className='main-content' ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {getRoutes(routes)}
          <Redirect from='*' to='/admin/index' />
        </Switch>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  )
}

export default Admin
