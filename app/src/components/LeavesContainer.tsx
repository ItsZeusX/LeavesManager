import LeavesAdder from "./LeavesAdder";
import Leaves from "./Leaves";
import LeavesCalendar from "./LeavesCalendar";

export const LeavesContainer = () => {
  return (
    <div className="flex flex-col p-10  gap-5 h-screen w-full overflow-x-hidden">
      <div className="flex gap-5 ">
        <div className="w-1/3">
          <LeavesAdder />
        </div>
        <div className="w-2/3">
          <Leaves />
        </div>
      </div>
      <LeavesCalendar />
    </div>
  );
};
