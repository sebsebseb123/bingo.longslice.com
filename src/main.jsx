import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import Root from './routes/root'
import ErrorPage from './error-page'

import { Amplify } from 'aws-amplify'
import config from './aws-exports'
import Admin from './routes/admin'
Amplify.configure(config)

const gridId = 'd174d3a5-bf74-4d3f-9efb-0d2bc0d7f4c0';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "ilovetacos",
    element: <Admin />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
