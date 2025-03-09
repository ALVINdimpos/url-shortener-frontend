import { RootState } from '@/states/store';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { isOpen: sidebarOpen } = useSelector(
    (state: RootState) => state.sidebar
  );

  return (
    <main className="w-full min-h-screen flex flex-col overflow-y-scroll">
      <section className="flex relative flex-1 w-full h-full">
        <Sidebar />
        <section
          className={`absolute top-[10vh] p-6 flex-1 transition-all duration-300 ease-in-out w-full h-[90vh] ${
            sidebarOpen
              ? 'left-[40vw] w-[60vw] md:left-[25vw] md:w-[75vw] lg:left-[20vw] lg:w-[80vw]'
              : 'left-[5vw] w-[95vw] md:left-[5vw] md:w-[95vw]'
          } p-4`}
        >
          {children}
        </section>
      </section>
    </main>
  );
};

export default Layout;
