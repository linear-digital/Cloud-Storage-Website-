import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Public from '../Pages/Public/Public'
import DriveLayout from '../Pages/Drive/DriveLayout'
import Home from '../Pages/Drive/Home/Home'
import Login from '../Pages/Auth/Login'
import Signup from '../Pages/Auth/Signup'
import Files from '../Pages/Drive/Files/Files'
import AuthChecker from '../helper/authChecker'
import Recent from '../Pages/Drive/Recent/Recent'
import Folders from '../Pages/Drive/Folders/Folders'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        // element: <Public />
        element: <Login />,
      },
      {
        path: 'drive',
        element: <AuthChecker> <DriveLayout /></AuthChecker>,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: 'files',
            element: <Files />
          },
          {
            path: 'recent',
            element: <Recent />
          },
          {
            path: 'folders',
            element: <Folders />
          },
          {
            path: 'recovery',
            element: <Files mode={"recovery"} />
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
