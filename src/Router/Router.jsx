import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Public from '../Pages/Public/Public'
import DriveLayout from '../Pages/Drive/DriveLayout'
import Home from '../Pages/Drive/Home/Home'
import Login from '../Pages/Auth/Login'
import Signup from '../Pages/Auth/Signup'
import Files from '../Pages/Drive/Files/Files'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Public />
      },
      {
        path: 'drive',
        element: <DriveLayout />,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: 'files',
            element: <Files />
          }
        ]
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  }
])


export default router
