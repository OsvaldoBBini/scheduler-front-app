import { Plus } from "@phosphor-icons/react";
import { ProfileInfos } from "./components/ProfileInfos";
import { DayFilter } from "./components/DayFilter";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { ReactPortal } from "../../components/ReactPortal";

import { hide, show } from "../../../app/utils/style";
import { CreateCategoryModal } from "../../components/CreateCategoryModal";
import { RegisterForm } from "./components/RegisterForm";
import { EditCategoryModal } from "../../components/EditCategoryModal";

export function Dashboard() {

  const [isVisible, setIsVisible] = useState(false);

  const [createNewCategory, setCreateNewCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [register, setRegister] = useState(false);

  const handleNewCategory = useCallback(() => setCreateNewCategory(prevState => !prevState), []);

  const handleEditCategory = useCallback(() => setEditCategory(prevState => !prevState), []);

  const handleRegister = useCallback(() => setRegister(prevState => !prevState), []);

  const handleVisible = () => {
    setIsVisible(prevState => !prevState);
  }

  return (
    <div className="relative h-screen w-screen">

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

        <motion.div className="absolute -top-36 right-0" animate={isVisible ? show : hide}>
          <div className="text-right w-44">
            <button onClick={handleNewCategory}  className="mb-3 shadow-md py-1 px-2 rounded-lg">Nova Categoria</button>
            <button className="mb-3 shadow-md py-1 px-2 rounded-lg" onClick={handleEditCategory}>Editar Categoria</button>
            <button onClick={handleRegister}  className="shadow-md py-1 px-2 rounded-lg">Novo Atendimento</button>
          </div>
        </motion.div>
      </footer>

      <ReactPortal containerID="create-category" children={<CreateCategoryModal isOpen={createNewCategory} onNewCategory={handleNewCategory}/>}/>

      <ReactPortal containerID="edit-category" children={<EditCategoryModal isOpen={editCategory} onEditCategory={handleEditCategory}/>}/>

      <ReactPortal containerID="register" children={<RegisterForm isOpen={register} onRegister={handleRegister}/>}/>

    </div>
  )
}