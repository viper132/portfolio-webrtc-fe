import { Variants, motion } from 'framer-motion';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

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
  disabled?: boolean;
  text: string;
  className?: string;
  onClick?(): void;
}

const Button = forwardRef<HTMLButtonElement, props>(
  ({ text, className, disabled = false, onClick }, ref) => {
    return (
      <motion.button
        disabled={disabled}
        ref={ref}
        variants={variants}
        type="submit"
        className={twMerge(
          'font-semibold px-4 py-2 rounded-md shadow-md',
          disabled
            ? 'bg-gray-200 dark:bg-gray-800'
            : 'text-[#4E4FEB] bg-white dark:bg-black dark:text-white shadow-purple-600 hover:bg-slate-200 hover:shadow-purple-500 dark:hover:bg-gray-900 dark:active:bg-gray-800 active:bg-slate-100 active:shadow-purple-400',
          className
        )}
        onClick={disabled ? () => null : onClick}
      >
        {text}
      </motion.button>
    );
  }
);

export default Button;
