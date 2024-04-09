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
import ErrorModal from "./Modals/ErrorModal";

const LeavesAdder = () => {
  const leaveTypes = [
    {
      label: "Congé payé",
      value: "vacation",
    },
    {
      label: "Congé sans solde",
      value: "unpaid",
    },
    {
      label: "Congé maladie",
      value: "sick",
    },
  ];

  const durations = [
    {
      label: "Une journée",
      value: "one",
    },
    {
      label: "Nombre de jours",
      value: "range",
    },
    {
      label: "Matin",
      value: "morning",
    },
    {
      label: "Après-midi",
      value: "afternoon",
    },
  ];
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  //SELECTION
  const [leaveType, setLeaveType] = useState("vacation");
  const [duration, setDuration] = useState("one");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [comment, setComment] = useState("");
  //ERROR MODAL
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorData, setErrorData] = useState<any>([]);

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
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setErrorModalOpen(true);
          setErrorData(data);
          return;
        }
        setRefreshEffect((prev: boolean) => !prev);
      });
  };

  //TO KEEP THE END DATE AFTER THE START DATE
  useEffect(() => {
    if (endDate < startDate) {
      setEndDate(startDate);
    }
  }, [startDate]);

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-4 font-Inter border p-6  h-fit rounded-xl font-poppins ">
        <h1 className="text-xl font-light text-zinc-600 ">AJOUTER CONGÉ </h1>

        {/* //? LEAVE TYPE ------------------------------------------------------ */}
        <Select
          isRequired
          size="sm"
          label="Type de congé"
          placeholder="Selectionnez un type de congé"
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
          label="Durée de congé"
          placeholder="Durée de congé"
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
            label="Date de début"
          ></Calendar>
          {/* //? END DATE ------------------------------------------------------ */}
          {duration === "range" && (
            <Calendar
              date={endDate}
              setDate={setEndDate}
              minDate={startDate}
              label="Date de fin"
            ></Calendar>
          )}
        </div>
        {/* //? COMMENT ------------------------------------------------------ */}
        <Input
          placeholder="Commentaire"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {/* //? SUBMIT ------------------------------------------------------ */}
        <Button size="sm" color="success" variant="flat" onClick={onOpen}>
          Confirmer
        </Button>

        {/* //? CONFIRMATION MODAL ------------------------------------------------------ */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Confirmation
                </ModalHeader>
                <ModalBody>
                  <p>
                    Êtes-vous sûr(e) de vouloir soumettre cette demande de congé
                    ?
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Fermer
                  </Button>
                  <Button
                    variant="flat"
                    color="primary"
                    onPress={onClose}
                    onClick={() => handleAddLeave()}
                  >
                    Oui
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        {/* //! ERROR MODAL */}
        <ErrorModal
          title={
            errorData.error == "DATE_OVERLAP"
              ? "Chevauchement de dates"
              : "Solde insuffisant"
          }
          body={
            errorData.error == "DATE_OVERLAP"
              ? "Le congé que vous avez demandé chevauche un autre congé pour lequel vous avez déjà fait une demande. Veuillez vérifier les dates et réessayer."
              : "Vous n'avez pas assez de solde pour demander ce congé."
          }
          isOpen={errorModalOpen}
          setIsOpen={setErrorModalOpen}
        ></ErrorModal>
      </div>
      <div className="p-6 border rounded-xl">
        <Balance></Balance>
      </div>
    </div>
  );
};

export default LeavesAdder;
