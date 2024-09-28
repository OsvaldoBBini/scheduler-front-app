import { Outlet } from "react-router-dom";

export function ConfirmationLayout() {

  return (
    <div className="w-full h-lvh flex justify-center items-center flex-col">
      <p className="text-gray-700 text-center font-medium text-md mt-6 max-w-[300px]">  
          Precisamos validar o código que enviamos a seu email, por favor, insira o código enviado para o seu email:
      </p>
      <div className="w-full max-w-[400px] px-8">
        <Outlet/>
      </div>
    </div>
  )

}