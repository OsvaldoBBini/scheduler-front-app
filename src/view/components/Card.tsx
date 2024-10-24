interface ICard {
  children: React.ReactNode;
}

export function Card({children}: ICard): JSX.Element {
  return (
    <div className="flex items-center justify-between border-l-[6px] rounded-lg border-l-indigo-800 h-full p-2 shadow-md">
      <>
        {children}
      </>
    </div>
  )
}