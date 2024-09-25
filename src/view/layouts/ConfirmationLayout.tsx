import { Outlet } from "react-router-dom";

export function ConfirmationLayout() {

  return (
    <div className="w-full h-lvh flex justify-center items-center flex-col">
      <p className="text-gray-700 text-center font-medium text-md mt-6 max-w-[300px] mb-4">  
          Precisamos validar sua conta, por favor, insira o código enviado para o seu email:
      </p>
      <Outlet/>
    </div>
  )

}