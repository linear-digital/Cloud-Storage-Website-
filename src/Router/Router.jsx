import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Public from '../Pages/Public/Public'
import DriveLayout from '../Pages/Drive/DriveLayout'
import Home from '../Pages/Drive/Home/Home'

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
            }
          ]
        }
      ]
    }
  ])
  

export default router
