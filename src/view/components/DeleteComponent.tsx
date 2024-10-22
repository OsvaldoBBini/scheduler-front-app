import { X } from "@phosphor-icons/react";
import { Button } from "./Button";

interface IDeleteComponent {
  onCancelDelete: () => void;
}

export function DeleteComponent({onCancelDelete}: IDeleteComponent) {
  return(
      <>
        <Button className="border-red-700 border-[1px] bg-red-50 text-red-700 hover:bg-red-100" >
          Deletar?
        </Button>
        <Button className="p-2.5 border-[1px] border-gray-600 bg-gray-100 text-gray-600 hover:bg-gray-50" onClick={onCancelDelete}>
          <X size={25}/>
        </Button>
      </>
  )
}