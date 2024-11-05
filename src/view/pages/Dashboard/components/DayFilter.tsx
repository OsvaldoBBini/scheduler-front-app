import { Button } from "../../../components/Button";
import { Select } from "../../../components/Select";
import { useDateFilters } from "../../../../app/hooks/useDateFilters";
import { IDay, IMonth, IYear } from "../../../../app/contexts/DateFiltersContext";
import { useEffect, useRef } from "react";

export function DayFilter(): JSX.Element {

  const { daySelection, monthSelection, yearSelection, months, allDays, years, handleYearChange, handleMonthChange, handleDayChange } = useDateFilters();

  const currentDayRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (currentDayRef.current) {
      currentDayRef.current.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [daySelection]);

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
            {years.map((year: IYear) => 
              <option key={year.year} value={year.year}>{year.year}</option>
            )}
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
            <li key={day.day} ref={day.day === daySelection ? currentDayRef : null}>
              <Button className={`flex flex-col justify-center items-center w-20 h-24 shadow-md ${day.day !== daySelection && 'bg-white text-gray-500 hover:text-white'}`} onClick={() => handleDayChange(day.day)}>
                <small>{day.dayOfWeek}</small>
                <span>{day.day}</span>
              </Button>
            </li>
          )}
      </ul>
    </div>
  );
}