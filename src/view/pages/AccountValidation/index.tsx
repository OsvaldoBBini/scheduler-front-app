import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useAccountValidation } from "./useAccountValidation";

export function AccountValidation() {

  const { handleSubmit, isPending, register, errors } = useAccountValidation(); 

  return (
      <form 
        action=""
        onSubmit={handleSubmit}
        className="mt-[60px] flex flex-col gap-4"
      >
        <Input 
          placeholder="Código de verificação" 
          {...register('confirmationCode')}
          error={errors.confirmationCode?.message}/>
        <Button type="submit" isPending={isPending}>
          Validar
        </Button>
      </form>
  )
}