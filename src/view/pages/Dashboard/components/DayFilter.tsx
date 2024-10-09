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

    <div>
      <ul className="flex gap-x-2 h-full overflow-y-scroll w-full">
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