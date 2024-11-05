import { ProfileInfos } from "./components/ProfileInfos";
import { DayFilter } from "./components/DayFilter";
import { DateFiltersProvider } from "../../../app/contexts/DateFiltersContext";
import { DashboardContent } from "./components/DashbordContent";

export function Dashboard() {

  return (
    <DateFiltersProvider>
      <div className="relative h-full w-full">

        <header className="w-full flex justify-end items-center p-2">
          <ProfileInfos/>
        </header>

        <section className="flex justify-center">
          <DayFilter/>
        </section>

        <main className="w-full">
          <DashboardContent/>
        </main>

      </div>
    </DateFiltersProvider>
  )
}