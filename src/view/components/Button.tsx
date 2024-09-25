import { ComponentProps } from 'react'
import { cn } from '../../lib/utils'
import { Spinner } from './Spinner'

interface ButtonProps extends ComponentProps<'button'> {
  isPending?:boolean
}

export function Button({className, isPending, disabled, children, ...props}: ButtonProps) {
  return (
    <button 
    {...props} 
    disabled = {disabled || isPending}
    className={cn("bg-indigo-900 hover:bg-indigo-800 disabled:bg-gray-100 px-6 h-12 rounded-2xl font-medium text-white disabled:text-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center",
    className)}
    >
      {!isPending && children}
      {isPending && <Spinner className='w-6 h-6'/>}
    </button>
  )
}