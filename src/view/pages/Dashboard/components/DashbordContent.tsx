import { useCallback, useState } from "react";
import { AppointmentView } from "./AppoitmentsView";
import { Plus } from "@phosphor-icons/react";
import { ReactPortal } from "../../../components/ReactPortal";
import { CreateCategoryModal } from "../../../components/CreateCategoryModal";
import { EditCategoryModal } from "../../../components/EditCategoryModal";
import { RegisterForm } from "./RegisterForm";

export function DashboardContent() {
  
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
  
  return(
    <>
      <section className="flex justify-center">
        <AppointmentView/>
      </section>

      <footer className="fixed bottom-10 right-10">
        <button className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 relative" onClick={handleVisible}>
          <Plus size={35} fill="#000" className={`${isVisible && 'rotate-45'} transition-all`}/>
        </button>

        <div className={`absolute -top-40 right-0 ${isVisible ? 'block' : 'hidden'}`}>
          <div className="text-right w-48 bg-white h-36 p-2 rounded-lg shadow-md">
            <button onClick={handleNewCategory}  className="mb-3 shadow-md py-1 px-2 rounded-lg">Nova Categoria</button>
            <button className="mb-3 shadow-md py-1 px-2 rounded-lg" onClick={handleEditCategory}>Editar Categoria</button>
            <button onClick={handleRegister}  className="shadow-md py-1 px-2 rounded-lg">Novo Atendimento</button>
          </div>
        </div>
      </footer>

      <ReactPortal containerID="create-category" children={<CreateCategoryModal isOpen={createNewCategory} onNewCategory={handleNewCategory}/>}/>

      <ReactPortal containerID="edit-category" children={<EditCategoryModal isOpen={editCategory} onEditCategory={handleEditCategory}/>}/>

      <ReactPortal containerID="register" children={<RegisterForm isOpen={register} onRegister={handleRegister}/>}/>
    </>
  )
}