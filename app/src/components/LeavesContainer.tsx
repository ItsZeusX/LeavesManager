import LeavesAdder from "./LeavesAdder";
import Leaves from "./Leaves";
import LeavesCalendar from "./LeavesCalendar";
import useLeaves from "../hooks/useLeaves";
import Balance from "./Balance";

export const LeavesContainer = () => {
  useLeaves();
  return (
    <div className="flex flex-col p-5 md:p-10  gap-5 h-screen w-full overflow-x-hidden">
      <div className="flex flex-col md:flex-row gap-5 ">
        <div className="flex flex-col gap-5 md:w-1/3 ">
          <LeavesAdder />
          <div className="p-6 border rounded-xl overflow-auto">
            <Balance></Balance>
          </div>
        </div>
        <div className="md:w-2/3">
          <Leaves />
        </div>
      </div>
      <LeavesCalendar />
    </div>
  );
};
