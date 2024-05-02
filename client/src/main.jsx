import ReactDOM from 'react-dom/client'
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Home from './pages/Home/index.jsx';
import Profile from './pages/Profile/index.jsx';
import NewPost from './pages/NewPost/index.jsx';
import Friends from './pages/Friends/index.jsx';
import Login from './pages/Login/index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <React.StrictMode>
      <ChakraProvider disableGlobalStyle={true} resetCSS={false}>
        <App />
      </ChakraProvider>
    </React.StrictMode>,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/newpost',
        element: <NewPost />,
      },
      {
        path: '/friends',
        element: <Friends />,
      },
      // {
      //   path: '/login',
      //   element: <Login />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
