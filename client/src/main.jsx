import ReactDOM from 'react-dom/client'
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Home from './pages/Home/index.jsx';
import Profile from './pages/Profile/index.jsx';
import Friends from './pages/Friends/index.jsx';
import Grouplist from './pages/GroupList/index.jsx';



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
        element: <Home />,
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
        path: '/friends',
        element: <Friends />,
      },
      {
        path: '/grouplist',
        element: <Grouplist />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);