import { forwardRef, ComponentProps } from "react";
import { cn } from "../../lib/utils";

interface InputProps extends ComponentProps<'select'> {
  children: JSX.Element
}

export const Select = forwardRef<HTMLSelectElement, InputProps>(({className, children, ...props}, ref) => 

  <select 
      className={cn("block py-2.5 px-0 w-full text-md bg-transparent dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer", className)} 
    {...props} ref={ref}>
      {children}
  </select>

)