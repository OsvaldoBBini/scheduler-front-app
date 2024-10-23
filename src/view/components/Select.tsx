import { forwardRef, ComponentProps } from "react";
import { cn } from "../../lib/utils";
import { XCircle } from "@phosphor-icons/react";

interface InputProps extends ComponentProps<'select'> {
  children: JSX.Element,
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, InputProps>(({className, children, error, ...props}, ref) => 
  <>
    <select 
        className={cn("block py-2.5 px-0 w-full text-md bg-transparent dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer", error && '!border-red-900', className)} 
      {...props} ref={ref}>
        {children}
    </select>

    {error && 
      <div className='flex gap-1 items-center mt-2 text-red-900'>
        <XCircle size={15}/>
        <span className="text-xs">{error}</span>
      </div>
    }
  </>

)