// src/App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './pages/DashboardLayout';
import DashboardHomePage from './pages/dashboard/DashboardHomePage';
import ManageChildrenPage from './pages/dashboard/ManageChildrenPage';
import ManageActivitiesPage from './pages/dashboard/ManageActivitiesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true, // /dashboard
        element: <DashboardHomePage />,
      },
      {
        path: 'children', // /dashboard/children
        element: <ManageChildrenPage />,
      },
      {
        path: 'children/:childId/activities', // /dashboard/children/:childId/activities
        element: <ManageActivitiesPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
