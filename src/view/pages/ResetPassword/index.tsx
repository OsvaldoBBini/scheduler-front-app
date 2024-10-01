import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { useResetPassword } from "./useResetPassword";

export function ResetPassword () {

  const { handleSubmit, register, errors, isPending } = useResetPassword();

  return (
    <div>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Vamos trocar sua senha
        </h1>
        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Informe sua nova senha
          </span>
        </p>
      </header>

      <form 
        action=""
        className="mt-[60px] flex flex-col gap-4"
        onSubmit={handleSubmit}>

        <Input 
          type="password"
          placeholder="Password"
          error={errors.password?.message}
          {...register("password")}/>
      
        <Button type="submit" className="mt-2" isPending={isPending}>
          Trocar Senha
        </Button>
      
      </form>

    </div>
  )
}