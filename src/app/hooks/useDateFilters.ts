import { useContext } from "react";
import { DateFiltersContext } from "../contexts/DateFiltersContext";


export function useDateFilters() {
  return useContext(DateFiltersContext)
}