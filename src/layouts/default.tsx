import ThemeToggler from '@components/ThemeToggler';
import { Outlet } from 'react-router-dom';
const DefaultLayout = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-purple-300 to-[#4E4FEB] dark:from-black dark:to-[#4E4FEB] text-black dark:text-white">
      <ThemeToggler />
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
