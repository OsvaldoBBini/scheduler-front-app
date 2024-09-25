import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { Link } from "react-router-dom"
import { useRegisterController } from "./useRegisterController"

export function Register () {
  const { errors, handleSubmit, register, isPending } = useRegisterController();
  return (
    <div>

    <header className="flex flex-col items-center gap-4 text-center">
      <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
        Crie sua conta
      </h1>
      <p className="space-x-2">
        <span className="text-gray-700 tracking-[-0.5px]">
          Ja possui uma conta?
        </span>
        <Link to="/login" className="tracking-[-0.5px] font-medium text-indigo-900">
          Fazer Login
        </Link>
      </p>
    </header>

    <form action="" className="mt-[60px] flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input 
        placeholder="Nome"
        error={errors.name?.message} 
        {...register('name')}/>
      
      <Input 
        type="email" 
        placeholder="E-mail" 
        error={errors.email?.message} 
        {...register('email')}/>
      
      <Input 
        type="password" 
        placeholder="Senha" 
        error={errors.password?.message} 
        {...register('password')}/>
      
      <Button type="submit" className="mt-2" isPending={isPending}>
        Criar Conta
      </Button>
    
    </form>

  </div>
  )
}