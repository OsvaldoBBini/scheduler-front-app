import { createContext, useCallback, useMemo, useState } from "react";

export interface IDay {
  day: number;
  dayOfWeek: string
}

export interface IMonth {
  month: string;
  monthIndex: number
}

export interface IYear {
  year: number;
}

interface DateFiltersValue {
  daySelection: number;
  monthSelection: number;
  yearSelection: number;
  searchDate: string;
  months: IMonth[];
  allDays: IDay[];
  years: IYear[];
  handleYearChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; 
  handleMonthChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; 
  handleDayChange: (currentSelection: number) => void;
}

export const DateFiltersContext = createContext({} as DateFiltersValue);

export function DateFiltersProvider({ children }: {
  children: React.ReactNode
}) {

  const [daySelection, setDaySelection] = useState<number>(() => new Date().getDate());
  const [monthSelection, setMonthSelection] = useState<number>(() => new Date().getMonth());
  const [yearSelection, setYearSelection] = useState<number>(() => new Date().getFullYear());

  const searchDate = useMemo(() => {
    const day = daySelection < 10 ? `0${daySelection}` : daySelection;
    return `${day}-${monthSelection+1}-${yearSelection}`
  },[daySelection, monthSelection, yearSelection]);

  const months = useMemo(() => [
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
  ], []);

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

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = []

    for (let year = currentYear; year <= currentYear + 4; year++) {
      years.push({
        year
      })
    }

    return years
  }, []);

  const handleYearChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value)
    setYearSelection(value);
  },[]); 

  const handleMonthChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value)
    setMonthSelection(value);
  },[]);
  
  const handleDayChange = useCallback((currentSelection: number) => {
    setDaySelection(currentSelection);
  },[]);

  return (
    <DateFiltersContext.Provider value={{ daySelection, monthSelection, yearSelection, searchDate, months, allDays, years, handleYearChange, handleMonthChange, handleDayChange }}>
      {children}
    </DateFiltersContext.Provider>
  );
}