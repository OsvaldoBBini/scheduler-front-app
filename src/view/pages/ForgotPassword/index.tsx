import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { useForgotPasswordController } from "./useForgotPasswordController";

export function ForgotPassword () {

  const { handleSubmit, register, errors, isPending } = useForgotPasswordController();

  return (
    <div>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Vamos recuperar sua conta
        </h1>
        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Informe seu email cadastrado
          </span>
        </p>
      </header>

      <form 
        action=""
        className="mt-[60px] flex flex-col gap-4"
        onSubmit={handleSubmit}>

        <Input 
          type="email"
          placeholder="E-mail"
          error={errors.email?.message}
          {...register("email")}/>
      
        <Button type="submit" className="mt-2" isPending={isPending}>
          Recuperar Conta
        </Button>
      
      </form>

    </div>
  )
}