import { PeerContext } from '@context/Peer';
import { useContext } from 'react';

const usePeer = () => useContext(PeerContext);

export default usePeer;
