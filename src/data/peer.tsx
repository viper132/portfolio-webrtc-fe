const peerOptions = {
  host: import.meta.env.VITE_APP_PEER,
  port: Number(import.meta.env.VITE_APP_PEER_PORT),
  path: '/peerServer',
};

export default peerOptions;
