import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ToastContainer } from 'react-toastify';
import './index.css';
import 'react-toastify/ReactToastify.min.css';
import PeerProvider from '@context/Peer.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PeerProvider>
    <ToastContainer theme="dark" />
    <App />
  </PeerProvider>
);
