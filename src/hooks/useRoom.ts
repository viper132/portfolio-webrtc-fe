import usePeer from '@hooks/usePeer';
import socket from '@services/socket';
import { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import mediaStore from 'src/store/media';

interface guestMediaList {
  guestId: string;
  stream: MediaStream;
}

const useRoom = () => {
  const [mediaState, setMediaState] = useAtom(mediaStore);
  const { peer, roomName } = usePeer();
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const [media, setMedia] = useState<MediaStream>();
  const [guestMedia, setGuestMedia] = useState<guestMediaList[]>([]);

  /**
   * @description Listening guest media change and add stream to element
   */
  useEffect(() => {
    if (guestMedia) {
      guestMedia.forEach(({ stream }) => {
        const element = document.getElementById(stream.id) as HTMLVideoElement;
        if (element) {
          element.srcObject = stream;
          element.autoplay = true;
        }
      });
    }
  }, [guestMedia]);

  /**
   * @description listen peer and socket stream
   */
  useEffect(() => {
    if (media && peer) {
      socket.on('leaved', (guestId: string) => {
        setGuestMedia((oldMedia) => oldMedia.filter((old) => old.guestId !== guestId));
      });

      socket.on('joined', (guestId: string) => {
        // call and stream when answered
        peer.call(guestId, media, { metadata: guestId }).on('stream', (stream) => {
          setGuestMedia((oldMedia) =>
            oldMedia.find((media) => media.guestId === guestId)
              ? oldMedia
              : [...oldMedia, { stream, guestId }]
          );
        });
      });

      peer.on('call', (call) => {
        call.answer(media);
        call.on('stream', (stream) => {
          setGuestMedia((oldMedia) =>
            oldMedia.find((media) => media.guestId === call.metadata)
              ? oldMedia
              : [...oldMedia, { stream, guestId: call.metadata }]
          );
        });
      });
    }
  }, [peer, media]);

  /**
   * @description toggle video on and off
   */
  useEffect(() => {
    if (media) {
      const videoTrack = media.getTracks().find((track) => track.kind === 'video');
      if (videoTrack) videoTrack.enabled = Boolean(mediaState.vid);
    }
  }, [media, mediaState.vid]);

  /**
   * @description toggle audio on and off
   */
  useEffect(() => {
    if (media) {
      const audioTrack = media.getTracks().find((track) => track.kind === 'audio');
      if (audioTrack) audioTrack.enabled = mediaState.mic;
    }
  }, [media, mediaState.mic]);

  /**
   * @description toggle video or sharescreen
   */
  useEffect(() => {
    if (peer && roomName) {
      if (mediaState.vid === 'camera') {
        if (media) {
          media.getTracks().forEach((tracks) => tracks.stop());
        }
        navigator.mediaDevices
          .getUserMedia({
            audio: true,
            video: true,
          })
          .then((media) => {
            if (myVideoRef.current) {
              myVideoRef.current.srcObject = media;
              socket.emit('calling', { roomName, peerId: peer.id });
              setMedia(media);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (mediaState.vid === 'screen') {
        navigator.mediaDevices
          .getDisplayMedia({
            audio: true,
            video: true,
          })
          .then((media) => {
            if (myVideoRef.current) {
              myVideoRef.current.srcObject = media;
              socket.emit('calling', { roomName, peerId: peer.id });
              setMedia(media);
              // end stream when stop button is click
              media.getVideoTracks()[0].addEventListener('ended', () => {
                media.getTracks().forEach((tracks) => tracks.stop());
                setMediaState((oldMedia) => ({ ...oldMedia, vid: 'camera' }));
              });
            }
          })
          .catch(() => {
            setMediaState((oldMedia) => ({ ...oldMedia, vid: 'camera' }));
          });
      }
    }
  }, [peer, roomName, mediaState.vid]);
  return {
    videoEnable: Boolean(mediaState.vid),
    myVideoRef,
    guestMedia,
  };
};

export default useRoom;
