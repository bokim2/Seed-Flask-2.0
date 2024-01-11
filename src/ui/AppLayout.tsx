import { Outlet } from 'react-router-dom';
import MainNav from './MainNav';

export default function AppLayout() {
  return (
    <>
      <MainNav />
      testing app layout
      <main>
        <Outlet />
      </main>
    </>
  );
}
