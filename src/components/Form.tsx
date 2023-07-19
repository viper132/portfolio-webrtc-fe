import { motion } from 'framer-motion';
import { FC, FormEventHandler, ReactNode } from 'react';

interface props {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const Form: FC<props> = ({ children, ...props }) => {
  return (
    <motion.form
      {...props}
      initial="close"
      animate="open"
      transition={{ staggerChildren: 0.08 }}
      className="flex flex-col gap-2"
    >
      {children}
    </motion.form>
  );
};

export default Form;
