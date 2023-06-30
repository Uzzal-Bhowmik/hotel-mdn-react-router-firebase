import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Home from './components/Home/Home'
import DynamicRoom from './components/DynamicRoom/DynamicRoom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: "/",
          element: <Home></Home>
        },
        {
          path: "room/:id",
          loader: async ({ params }) => {
            return fetch(`https://649d92079bac4a8e669df59b.mockapi.io/hotelsData/${params.id}`)
          },
          element: <PrivateRoute><DynamicRoom></DynamicRoom></PrivateRoute>
        },
        {
          path: "login",
          element: <Login></Login>
        },
        {
          path: "register",
          element: <Register></Register>
        }
      ]
    }
  ])

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
