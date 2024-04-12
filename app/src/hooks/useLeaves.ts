import { useContext, useEffect, useState } from "react";
import storeContext from "../contexts/Store";

const useLeaves = () => { 
    const { refreshEffect , setLeaves } = useContext(storeContext);
    const [isPending, setIsPending] = useState(true);
    useEffect(() => {
        setIsPending(true);
      fetch("/api/employees/leaves")
        .then((res) => res.json())
        .then((data) =>
         {
            let sortedLeaves =  
                //sort by start_date
                data.sort(
                  (a: any, b: any) =>
                    new Date(a.start_date).getTime() -
                    new Date(b.start_date).getTime()
                )

            setLeaves(sortedLeaves)
            setIsPending(false)
         }
        );
    }, [refreshEffect]);

    return { isPending };
}

export default useLeaves;