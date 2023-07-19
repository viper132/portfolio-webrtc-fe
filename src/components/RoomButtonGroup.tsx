import { AiOutlineAudio, AiOutlineAudioMuted } from 'react-icons/ai';
import { BsCameraVideo, BsCameraVideoOff } from 'react-icons/bs';
import { TbCast, TbCastOff } from 'react-icons/tb';
import RoomButton from './RoomButton';
import { Tooltip } from 'react-tooltip';
import { FC, ReactElement } from 'react';
import { BiExit } from 'react-icons/bi';
import { useAtom } from 'jotai';
import mediaStore from 'src/store/media';
import { motion } from 'framer-motion';
import usePeer from '@hooks/usePeer';

interface buttonProps {
  className?: string;
  icon?: ReactElement;
  iconOn?: ReactElement;
  iconOff?: ReactElement;
  name: string;
  enable?: boolean;
  onClick(): void;
}

const Button: FC<buttonProps> = ({ className, name, icon, iconOn, iconOff, enable, onClick }) => {
  return (
    <RoomButton
      className={className}
      data-tooltip-id="room-button-group"
      data-tooltip-content={name}
      onClick={onClick}
    >
      {icon ? icon : enable ? iconOn : iconOff}
    </RoomButton>
  );
};

const RoomButtonGroup = () => {
  const { leave } = usePeer();
  const [media, setMedia] = useAtom(mediaStore);
  const handleMicrophone = () => {
    setMedia((oldMedia) => ({ ...oldMedia, mic: !oldMedia.mic }));
  };
  const handleVideo = (vid: 'camera' | 'screen') => () => {
    setMedia((oldMedia) => ({
      ...oldMedia,
      vid: oldMedia.vid === vid ? undefined : vid,
    }));
  };
  return (
    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center">
      <motion.div
        initial="close"
        animate="open"
        transition={{ staggerChildren: 0.08 }}
        className="flex gap-4"
      >
        <Button
          iconOff={<AiOutlineAudioMuted className="text-red-500" />}
          iconOn={<AiOutlineAudio />}
          enable={media.mic}
          name={`Microphone is ${media.mic ? 'on' : 'off'}`}
          onClick={handleMicrophone}
        />
        <Button
          iconOff={<BsCameraVideoOff className="text-red-500" />}
          iconOn={<BsCameraVideo />}
          enable={media.vid === 'camera'}
          name={`Camera is ${media.vid === 'camera' ? 'on' : 'off'}`}
          onClick={handleVideo('camera')}
        />
        <Button
          iconOff={<TbCastOff className="text-red-500" />}
          iconOn={<TbCast />}
          enable={media.vid === 'screen'}
          name={`Screen Share is ${media.vid === 'screen' ? 'on' : 'off'}`}
          onClick={handleVideo('screen')}
        />
        <Button
          className="bg-red-500 dark:bg-red-500"
          icon={<BiExit />}
          name="Exit"
          onClick={leave}
        />
      </motion.div>
      <Tooltip id="room-button-group" />
    </div>
  );
};

export default RoomButtonGroup;
