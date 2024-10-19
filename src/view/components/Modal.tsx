import { motion } from "framer-motion";
import { hide, show } from "../../app/utils/style";
import { X } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import { ComponentProps } from "react";

interface IModal extends ComponentProps<'div'>{
  isOpen: boolean;
  onModal: () => void;
  title: string;
  children: JSX.Element;
}

// ${defaultValues ? 'bg-transparent' : 'bg-black'}

export function ModalContainer({isOpen, onModal, title, className, children}: IModal) {
  return (
    <motion.div className={cn('h-full w-full  fixed left-0 top-0 z-10 bg-opacity-75 bg-black', className)} animate={isOpen ? show : hide}>
      <div className="flex items-center justify-center w-full h-full">
        <div className="bg-white md:w-1/3 w-4/5 sm:h-2/4 h-3/5 rounded-lg p-3">
          <header className="flex justify-between">
            <h1 className="text-xl">
              {title}
            </h1>
            <button onClick={onModal}>
              <X size={28}/>
            </button>
          </header>

          {children}

        </div>
      </div>
    </motion.div>
  )
}