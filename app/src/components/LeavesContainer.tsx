import { useContext } from "react";
import LeavesAdder from "./LeavesAdder";
import storeContext from "../contexts/Store";
import Leaves from "./Leaves";

export const LeavesContainer = () => {
  const { user } = useContext(storeContext);
  return (
    <div className="flex gap-5 p-10 w-full h-screen">
      <div className="w-2/5">
        <LeavesAdder />
      </div>
      <div className="w-3/5">
        <Leaves />
      </div>
    </div>
  );
};
