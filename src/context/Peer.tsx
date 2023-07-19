import { FC, ReactNode, createContext, useState } from 'react';
import { Peer } from 'peerjs';
import peerOptions from '@data/peer';
import stringSpacetoDash from '@utils/stringSpacetoDash';
import socket from '@services/socket';

interface params {
  peer?: Peer;
  roomName?: string;
  connect: (userName: string, newRoomName: string) => Promise<undefined>;
  leave: () => void;
}

export const PeerContext = createContext({} as params);

interface props {
  children: ReactNode;
}

const PeerProvider: FC<props> = ({ children }) => {
  const [roomName, setRoomName] = useState<string>();
  const [peer, setPeer] = useState<Peer>();

  /**
   * @param peerId empty for random id
   * @description connect user to the peer server with given id
   */
  const connect = async (userName = '', newRoomName = '') => {
    if (peer) {
      return Promise.reject('peer already declared, please create peer once');
    } else {
      setPeer(new Peer(stringSpacetoDash(userName), peerOptions));
      setRoomName(newRoomName);
      socket.connect();
    }
  };

  const leave = () => {
    peer?.destroy();
    setPeer(undefined);
    setRoomName(undefined);
    socket.disconnect();
  };

  const value: params = { peer, roomName, connect, leave };
  return <PeerContext.Provider value={value}>{children}</PeerContext.Provider>;
};

export default PeerProvider;
