import { Link } from "react-router-dom"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { useLoginController } from "./useLoginController"

export function Login () {

  const { handleSubmit, register, errors, isPending, email } = useLoginController();

  return (
    <div>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Entre em sua conta
        </h1>
        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Novo por aqui?
          </span>
          <Link to="/register" className="tracking-[-0.5px] font-medium text-indigo-900">
            Crie uma conta
          </Link>
        </p>
      </header>

      <form 
        action=""
        className="mt-[60px] flex flex-col gap-4"
        onSubmit={handleSubmit}>

        <Input 
          type="email"
          defaultValue={email || ''}
          placeholder="E-mail"
          error={errors.email?.message}
          {...register("email")}/>
        
        <Input 
          type="password" 
          placeholder="Senha" 
          error={errors.password?.message}
          {...register("password")}/>
        <a className="font-bold text-xs text-right text-gray-600" href="/forgot">Esqueci minha senha</a>
      
        <Button type="submit" className="mt-2" isPending={isPending}>
          Entrar
        </Button>
      
      </form>

    </div>
  )
}