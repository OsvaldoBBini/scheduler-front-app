import { cn } from "../../lib/utils";

interface ICard {
  children: React.ReactNode;
  className: string;
}

export function Card({children, className}: ICard): JSX.Element {
  return (
    <div className={cn(
      "flex items-center justify-between border-l-[6px] rounded-lg border-l-indigo-800 h-full p-2 shadow-md", className
    )}>
      <>
        {children}
      </>
    </div>
  )
}