import usePeer from '@hooks/usePeer';
import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface props {
  children: ReactNode;
}

/**
 * @description When peer is not exist, then redirect user to home page
 */
const RequirePeer: FC<props> = ({ children }) => {
  const { peer } = usePeer();
  if (peer) return children;

  return <Navigate to="/" />;
};

export default RequirePeer;
