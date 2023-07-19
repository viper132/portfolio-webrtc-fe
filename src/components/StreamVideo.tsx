import { FC, ReactNode, Ref, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { AiOutlineUser } from 'react-icons/ai';
import { Variants, motion } from 'framer-motion';

const videoVariants: Variants = {
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
    borderRadius: 0,
  },
  close: { opacity: 1, scale: 0, borderRadius: '50%' },
};

const placeholderVariants: Variants = {
  open: {
    opacity: 0,
    scale: 2,
  },
  close: { opacity: 1, scale: 1 },
};

interface props {
  className?: string;
  children?: ReactNode;
  videoEnable: boolean;
  muted?: boolean;
}

const StreamVideo = forwardRef<HTMLVideoElement, props>(
  ({ className, children, videoEnable, muted = false }, ref) => {
    return (
      <div
        className={twMerge(
          'relative overflow-hidden w-full h-full bg-white dark:bg-[#4E4FEB] rounded-xl flex items-center justify-center',
          className
        )}
      >
        <motion.video
          initial="close"
          variants={videoVariants}
          animate={videoEnable ? 'open' : 'close'}
          playsInline
          muted={muted}
          ref={ref}
          autoPlay
          className="h-full absolute top-0  "
        />
        <motion.div
          initial="open"
          variants={placeholderVariants}
          animate={!videoEnable ? 'open' : 'close'}
          className="rounded-full p-8 bg-[#4E4FEB] dark:bg-white text-white dark:text-black"
        >
          <AiOutlineUser className="h-8 w-8" />
        </motion.div>
        {children}
      </div>
    );
  }
);

export default StreamVideo;
