import RoomButtonGroup from '@components/RoomButtonGroup';
import StreamVideo from '@components/StreamVideo';
import useRoom from '@hooks/useRoom';

const RoomPage = () => {
  const { guestMedia, myVideoRef, videoEnable } = useRoom();
  return (
    <div className="w-screen h-screen flex flex-col overflow-auto p-2">
      <StreamVideo ref={myVideoRef} muted videoEnable={videoEnable}>
        <RoomButtonGroup />
      </StreamVideo>
      <div className="h-44 flex gap-2 p-2 overflow-auto">
        {guestMedia &&
          guestMedia.map(({ stream }) => (
            <video
              className="rounded-lg min-w-[200px] bg-black"
              key={stream.id}
              id={stream.id}
              autoPlay
            />
          ))}
      </div>
    </div>
  );
};

export default RoomPage;
