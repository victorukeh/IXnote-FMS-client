import React from 'react'
import { useLocation, Route, Switch, Redirect } from 'react-router-dom'
import Logs from 'views/examples/Logs'
import Sidebar from 'components/Sidebar/Sidebar.js'
import routes from 'routes.js'


const LogLayout = (props) => {
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
        <Switch>
          {getRoutes(routes)}
          <Route path={'/logs/all'} component={Logs} />
          {/* <Route path={'/admin/logs'} component={Logs} /> */}
          <Redirect from='*' to='/admin/index' />
        </Switch>
      </div>
    </>
  )
}

export default LogLayout
