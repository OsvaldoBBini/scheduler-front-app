import { Plus } from "@phosphor-icons/react";
import { ProfileInfos } from "./components/ProfileInfos";
import { DayFilter } from "./components/DayFilter";
import { RegisterForm } from "./components/RegisterForm";

export function Dashboard() {

  return (
    <div className="relative h-screen w-screen">

      <RegisterForm/>

      <header className="w-full flex justify-end items-center p-2">
        <ProfileInfos/>
      </header>

      <section className="flex justify-center">
        <DayFilter/>
      </section>

      <footer className="fixed bottom-10 right-10">
        <button className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100">
          <Plus size={35} fill="#000"/>
        </button>
      </footer>
    </div>
  )
}