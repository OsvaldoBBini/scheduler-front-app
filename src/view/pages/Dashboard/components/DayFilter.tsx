import { useMemo } from "react";
import { Button } from "../../../components/Button";

interface IDay {
  day: number;
  dayOfWeek: string
}

export function DayFilter(): JSX.Element {
  
  const allDays = useMemo(() => {
    const daysInMonth = new Date(2024, 10, 0).getDate();
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

    const days = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(2024, 9, day);
      days.push({
        day: day,
        dayOfWeek: daysOfWeek[date.getDay()]
      });
    }
  
    return days;    

  },[]);

  return (

    <div className="w-full flex justify-center">
      <ul className="
        flex gap-x-2 h-full overflow-x-auto overflow-y-hidden
        p-4
        sm:w-2/5
        md:w-2/5
        [&::-webkit-scrollbar]:h-2
      [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-gray-300
        [&::-webkit-scrollbar-thumb]:rounded-full
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          {allDays.map((day: IDay) => 
            <li>
              <Button className="flex flex-col justify-center items-center w-20 h-24 shadow-md" key={day.day}>
                <span>{day.day}</span>
                <small>{day.dayOfWeek}</small>
              </Button>
            </li>
          )}
      </ul>
      
    </div>

  );
}