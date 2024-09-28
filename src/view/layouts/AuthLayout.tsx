import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className=" flex flex-col justify-center items-center w-full h-lvh">
      <div className="w-full max-w-[400px] px-8">
        <Outlet/>
      </div>
    </div>
  );
}