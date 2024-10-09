import { ComponentProps, forwardRef } from 'react'
import { XCircle } from '@phosphor-icons/react';
import { cn } from '../../lib/utils'

interface InputProps extends ComponentProps<'input'> {
  name: string;
  error?: string
}

export const Input = forwardRef<HTMLInputElement,InputProps>(({placeholder, name, id, error, className,...props}, ref) => {
  const inputId = id ?? name;
  
  return (
    <div className="relative">
      
      <input
        id={inputId}
        ref={ref}
        name={name}
        {...props}
        className={cn(
          'w-full bg-white rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 peer pt-4 placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none',
          error && '!border-red-900', className
        )}
        placeholder=" "
       />

      <label 
        htmlFor={inputId}
        className="
          absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700
          peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
        >
        {placeholder}
      </label>

      {error && 
      <div className='flex gap-1 items-center mt-2 text-red-900'>
        <XCircle size={15}/>
        <span className="text-xs">{error}</span>
      </div>
      }
    </div>
  )
})