import useTheme from '@hooks/useTheme';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const ThemeToggler = () => {
  const { toggle, currentTheme } = useTheme();
  return (
    <button
      className="z-20 transition-all duration-300 absolute top-4 right-4 p-4 bg-white dark:bg-[#4E4FEB] text-[#4E4FEB] dark:text-white hover:opacity-90 active:opacity-80 rounded-full font-semibold outline-none shadow-md"
      onClick={toggle}
    >
      {currentTheme === 'dark' ? <MdDarkMode /> : <MdLightMode />}
    </button>
  );
};

export default ThemeToggler;
