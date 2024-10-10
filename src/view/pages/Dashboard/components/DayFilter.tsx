import { useMemo, useState } from "react";
import { Button } from "../../../components/Button";
import { Select } from "../../../components/Select";

interface IDay {
  day: number;
  dayOfWeek: string
}

interface IMonth {
  month: string;
  monthIndex: number
}

const months = [
  {month: 'Janeiro', monthIndex:0},
  {month: 'Fevereiro', monthIndex:1},
  {month: 'Março', monthIndex:2},
  {month: 'Abril', monthIndex:3},
  {month: 'Maio', monthIndex:4},
  {month: 'Junho', monthIndex:5},
  {month: 'Julho', monthIndex:6},
  {month: 'Agosto', monthIndex:7},
  {month: 'Setembro', monthIndex:8},
  {month: 'Outubro', monthIndex:9},
  {month: 'Novembro', monthIndex:10},
  {month: 'Dezembro', monthIndex:11},
]

export function DayFilter(): JSX.Element {

  const [monthSelection, setMonthSelection] = useState<number>(() => new Date().getMonth());
  const [yearSelection, setYearSelection] = useState<number>(() => new Date().getFullYear());

  const allDays = useMemo(() => {
    const daysInMonth = new Date(yearSelection, monthSelection + 1, 0).getDate();
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    const days = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(yearSelection, monthSelection, day);
      days.push({
        day: day,
        dayOfWeek: daysOfWeek[date.getDay()]
      });
    }
  
    return days;    

  },[monthSelection, yearSelection]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value)
    setYearSelection(value);
  } 

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value)
    setMonthSelection(value);
  };
  

  return (
    <div className="flex flex-col p-2 w-11/12
        md:w-2/5">

      <div className="flex items-end">

        <Select
          className="text-lg text-center w-32" 
          defaultValue={monthSelection}
          onChange={handleMonthChange}>
          <>
          {months.map((month: IMonth) => 
            <option
              className="text-base"
              key={month.month}
              value={month.monthIndex}>
              {month.month}
            </option>)}
          </>
        </Select>
        
        <span className="text-2xl">
        {','}
        </span>
        
        <Select
          className="text-center w-24"
          defaultValue={yearSelection}
          onChange={handleYearChange}>
          <>
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
          </>
        </Select>

      </div>

      <ul className="
        flex gap-x-2 h-full overflow-x-auto overflow-y-hidden
        p-4
        [&::-webkit-scrollbar]:h-2
      [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-gray-300
        [&::-webkit-scrollbar-thumb]:rounded-full
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          {allDays.map((day: IDay) => 
            <li key={day.day}>
              <Button className="flex flex-col justify-center items-center w-20 h-24 shadow-md">
                <small>{day.dayOfWeek}</small>
                <span>{day.day}</span>
              </Button>
            </li>
          )}
      </ul>
    </div>
  );
}