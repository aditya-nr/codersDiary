import React from 'react'
import { Activate, Dashboard, Home, Login, Register } from './pages'
import { Provider } from 'react-redux'
import { store } from './context'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  }, {
    path: '/login',
    element: <Login />
  }, {
    path: '/register',
    element: <Register />
  }, {
    path: '/activate',
    element: <Activate />
  }, {
    path: '/dashboard',
    element: <Dashboard />
  }
])
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
