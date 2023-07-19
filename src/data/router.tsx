import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '@layouts/default';
import HomePage from '@pages/Home';
import RoomPage from '@pages/Room';
import RequirePeer from '@components/RequirePeer';

const routerConfig = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/room',
        element: (
          <RequirePeer>
            <RoomPage />
          </RequirePeer>
        ),
      },
    ],
  },
]);

export default routerConfig;
