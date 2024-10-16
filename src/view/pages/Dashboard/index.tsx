import { Plus } from "@phosphor-icons/react";
import { ProfileInfos } from "./components/ProfileInfos";
import { DayFilter } from "./components/DayFilter";
import { motion } from "framer-motion";
import { useState } from "react";
// import { CreateTypeModal } from "../../components/CreateTypeModal";
// import { RegisterForm } from "./components/RegisterForm";

const show = {
  opacity: 1,
  display: "block"
};

const hide = {
  opacity: 0,
  transitionEnd: {
    display: "none"
  }
};

export function Dashboard() {

  const [isVisible, setIsVisible] = useState(false);

  const handleVisible = () => {
    setIsVisible(prevState => !prevState);
  }

  return (
    <div className="relative h-screen w-screen">

      {/* <RegisterForm/> */}
      {/* <CreateTypeModal/> */}

      <header className="w-full flex justify-end items-center p-2">
        <ProfileInfos/>
      </header>

      <section className="flex justify-center">
        <DayFilter/>
      </section>

      <footer className="fixed bottom-10 right-10">
        <button className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 relative" onClick={handleVisible}>
          <Plus size={35} fill="#000" className={`${isVisible && 'rotate-45'} transition-all`}/>
        </button>

        <motion.div className="absolute -top-24 right-0" animate={isVisible ? show : hide}>
          <div className="text-right w-44">
            <button className="mb-3 shadow-md py-1 px-2 rounded-lg">Nova Categoria</button>
            <button className="shadow-md py-1 px-2 rounded-lg">Novo Atendimento</button>
          </div>
        </motion.div>
      </footer>
    </div>
  )
}