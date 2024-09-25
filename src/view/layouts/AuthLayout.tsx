import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className=" flex flex-col justify-center items-center w-full h-lvh">
      <div className="w-full max-w-[400px] px-8">
        <Outlet/>
      </div>
      <p className="text-gray-700 text-center font-medium text-md mt-6 max-w-[200px]">  
          Gerencie seus atendimentos de maneira dinâmica e fácil!
      </p>
    </div>
  );
}