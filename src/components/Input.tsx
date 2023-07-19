import { ChangeEvent, forwardRef } from 'react';
import { Variants, motion } from 'framer-motion';
import { FieldError } from 'react-hook-form';

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
  placeholder?: string;
  error?: FieldError;
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, props>(
  ({ placeholder = 'Insert Data', error, onChange, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <motion.input
          ref={ref}
          {...props}
          className="px-4 py-2 w-full font-semibold rounded-md dark:bg-black text-[#4E4FEB] focus:outline-purple-600 focus:ring"
          variants={variants}
          type="text"
          placeholder={placeholder}
          onChange={onChange}
        />
        {error && <span className="capitalize text-[10px] text-white">{error.message}</span>}
      </div>
    );
  }
);

export default Input;
