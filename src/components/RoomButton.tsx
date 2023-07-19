import { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { Variants, motion } from 'framer-motion';

const variants: Variants = {
  open: {
    opacity: 1,
    scale: 1,
  },
  close: {
    opacity: 0,
    scale: 0,
  },
};

interface props {
  className?: string;
  children: ReactNode;
  onClick?(): void;
}

const RoomButton: FC<props> = ({ className, children, onClick, ...props }) => {
  return (
    <motion.button
      {...props}
      variants={variants}
      onClick={onClick}
      className={twMerge(
        'shadow-md text-gray-50 bg-[#4E4FEB] hover:bg-[#4a4ada] active:bg-[#6262f7] dark:bg-black dark:hover:bg-gray-800 dark:active:bg-gray-900 p-4 rounded-full',
        className
      )}
    >
      {children}
    </motion.button>
  );
};

export default RoomButton;
