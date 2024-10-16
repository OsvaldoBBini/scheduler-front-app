import { PencilSimple, X } from "@phosphor-icons/react";
import { Input } from "../../../../components/Input";
import { Button } from "../../../../components/Button";
import { motion } from "framer-motion";
import { Select } from "../../../../components/Select";
// import { TypeModal } from "../../../../components/TypeModal";

export function RegisterForm(): JSX.Element {

  // ${isOpen ? 'block' : 'hidden'}

  return (
    <motion.div className="h-full w-full bg-black fixed z-10 bg-opacity-75">

      {/* <TypeModal/> */}

      <div className="flex flex-col justify-end items-end h-full">
      <form className="bg-white h-4/5 p-4 w-full rounded-t-lg">
        <header className="flex justify-between pb-3">
          <h1 className="text-xl">Novo Atendimento</h1>
          <button>
            <X size={28}/>
          </button>
        </header>
        <div className="flex flex-col gap-y-4 mt-4">
          <section>
            <Input 
              name="Nome"
              placeholder="Nome"/>
          </section>
          <section>
            <Input
              name="Telefone"
              placeholder="Telefone"/>
          </section>
          <section>
            <Input
              name="Data"
              type="date"
              placeholder="Data do atendimento"/>
          </section>
          <section className="flex flex-col">
            <label className="px-3 text-gray-700">Horário</label>
            <div className="flex justify-between w-full gap-x-4">
              <div className="w-full">
                <Input type='time' name="startAt" placeholder="Incío"/>
              </div>
              <div className="w-full">
                <Input type='time' name="endsAt" placeholder="Fim" />
              </div>
            </div>
          </section>
          <section className="flex w-full gap-x-3 items-end">
            <div className="w-full">
              <label className="px-3 text-gray-700">Categoria do atendimento</label>
              <Select className='bg-white rounded-lg border border-gray-500 p-3 h-[52px] text-gray-800 peer focus:border-gray-800'>
                <option value={'oi'} className="text-base">Oi</option>
              </Select>
            </div>
            <Button className="flex h-[52px] rounded-lg items-center justify-center border-[2px] bg-white text-gray-600 hover:bg-gray-50">
              <PencilSimple size={20}/>
            </Button>
          </section>
          <div className="flex w-full justify-end mt-5">
            <Button>Registrar</Button>
          </div>
        </div>
      </form>
      </div>
    </motion.div>
  )
}