import React from 'react'
import { Router } from '@reach/router'
import Provider from 'providers/Provider'
import AppWrapper from 'components/AppWrapper'
import App from 'components/App'
import Tasks from 'components/Tasks'
import Task from 'components/Task'
import AddTask from 'components/AddTask'
import NotFound from 'components/common/NotFound'
import Register from 'components/Register'
import Login from 'components/Login'

export default () => (
  <Provider>
    <AppWrapper>
      <Router>
        <App path="/app/" component={App} />
        <Tasks path="/app/tasks/" component={Tasks} />
        <Register path="/app/register/" component={Register} />
        <Login path="/app/login/" component={Login} />
        <Task path="/app/task/:id" component={Task} />
        <AddTask path="/app/task/new" component={AddTask} />
        <NotFound default component={NotFound} />
      </Router>
    </AppWrapper>
  </Provider>
)
