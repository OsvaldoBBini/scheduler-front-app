import { Input } from "../../components/Input";
import { useAccountValidation } from "./useAccountValidation";



export function AccountValidation() {

  const { register, errors } = useAccountValidation(); 

  return (
    <div className="flex" >
      <Input 
        placeholder="Código de verificação" 
        {...register('confirmationCode')}
        error={errors.confirmationCode?.message}/>
    </div>
  )
}