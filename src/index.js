import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { DataLayer } from './DataLayer'
import reducer, { initialState } from './reducer'

import 'assets/plugins/nucleo/css/nucleo.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'assets/scss/argon-dashboard-react.scss'

import AdminLayout from 'layouts/Admin.js'
import LogLayout from 'layouts/Logs.js'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <DataLayer initialState={initialState} reducer={reducer}>
        <Route path='/admin' render={(props) => <AdminLayout {...props} />} />
        <Route path='/logs' render={(props) => <LogLayout {...props} />} />
        {/* <Redirect from='/' to='/admin/index' /> */}
        <Route exact path='/'>
          <Redirect to='/admin/index' />
        </Route>
      </DataLayer>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)
