import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import { useContext, useEffect, useState } from "react";
import Calendar from "./Calendar";
import Balance from "./Balance";
import storeContext from "../contexts/Store";

const LeavesAdder = () => {
  const leaveTypes = [
    {
      label: "Vacation",
      value: "vacation",
    },
    {
      label: "Unpaid Leave",
      value: "unpaid",
    },
    {
      label: "Sick Leave",
      value: "sick",
    },
  ];

  const durations = [
    {
      label: "One Day",
      value: "one",
    },
    {
      label: "Range of Days",
      value: "range",
    },
    {
      label: "Morning",
      value: "morning",
    },
    {
      label: "Afternoon",
      value: "afternoon",
    },
  ];

  const [leaveType, setLeaveType] = useState("vacation");
  const [duration, setDuration] = useState("one");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { setRefreshEffect } = useContext(storeContext);

  const handleAddLeave = () => {
    const start_date = new Date(startDate);
    start_date.setHours(0, 0, 0, 0);
    const end_date = new Date(endDate);
    end_date.setHours(0, 0, 0, 0);

    fetch("/api/employees/leaves/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: leaveType,
        start_date: start_date,
        end_date: duration === "range" ? end_date : start_date,
        afternoon: duration === "afternoon",
        morning: duration === "morning",
      }),
    }).then(() => {
      setRefreshEffect((prev: boolean) => !prev);
    });
  };

  //TO KEEp THE END DATE AFTER THE START DATE
  useEffect(() => {
    if (endDate < startDate) {
      setEndDate(startDate);
    }
  }, [startDate]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-4 font-Inter border p-6  h-fit rounded-lg font-poppins ">
        <h2 className="text-2xl font-black">ADD LEAVE</h2>
        {/* //? LEAVE TYPE ------------------------------------------------------ */}
        <Select
          isRequired
          size="sm"
          label="Leave Type"
          placeholder="Select a leave type"
          defaultSelectedKeys={[leaveType]}
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
        >
          {leaveTypes.map((leaveType) => (
            <SelectItem key={leaveType.value} value={leaveType.value}>
              {leaveType.label}
            </SelectItem>
          ))}
        </Select>
        {/* //? LEAVE DURATION ------------------------------------------------------ */}
        <Select
          isRequired
          size="sm"
          label="Duration"
          placeholder="Duration of leave"
          value={duration}
          defaultSelectedKeys={[duration]}
          onChange={(e) => setDuration(e.target.value)}
        >
          {durations.map((duration) => (
            <SelectItem key={duration.value} value={duration.value}>
              {duration.label}
            </SelectItem>
          ))}
        </Select>
        {/* //? START DATE ------------------------------------------------------ */}
        <div className="flex gap-2">
          <Calendar
            date={startDate}
            setDate={setStartDate}
            label="Start Date"
          ></Calendar>
          {/* //? END DATE ------------------------------------------------------ */}
          {duration === "range" && (
            <Calendar
              date={endDate}
              setDate={setEndDate}
              minDate={startDate}
              label="End Date"
            ></Calendar>
          )}
        </div>
        {/* //? COMMENT ------------------------------------------------------ */}
        <Input placeholder="Comment" type="text" />
        {/* //? SUBMIT ------------------------------------------------------ */}
        <Button size="sm" color="success" variant="flat" onClick={onOpen}>
          Submit
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Confirmation
                </ModalHeader>
                <ModalBody>
                  <p>Are you sure you want to submit this leave request</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    variant="flat"
                    color="primary"
                    onPress={onClose}
                    onClick={() => handleAddLeave()}
                  >
                    Confirm
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      <div className="p-6 border rounded-xl">
        <Balance></Balance>
      </div>
    </div>
  );
};

export default LeavesAdder;
