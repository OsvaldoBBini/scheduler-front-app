import { X } from "@phosphor-icons/react";
import { Input } from "../../../components/Input";

export function RegisterForm(): JSX.Element {

  // ${isOpen ? 'block' : 'hidden'}

  return (
    <div className="h-full w-full bg-black fixed z-10 bg-opacity-75">
      <div className="flex justify-end items-end h-full">
      <form className="bg-white h-4/5 p-4 w-full rounded-t-lg">
        <header className="flex justify-end">
          <button>
            <X size={28}/>
          </button>
        </header>
        <form className="flex flex-col gap-y-3">
          <Input className="border-0 border-b-[1px] rounded-none" 
            name="Nome"
            placeholder="Nome"/>
          <Input className="border-0 border-b-[1px] rounded-none" 
            name="Telefone"
            placeholder="Telefone"/>
        </form>
      </form>
      </div>
    </div>
  )
}