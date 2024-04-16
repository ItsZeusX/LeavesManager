import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Chip,
} from "@nextui-org/react";
import { useContext } from "react";
import storeContext from "../../contexts/Store";
import moment from "moment";

interface ErrorModalProps {
  leave: any;
  employee: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const LeaveApprovalModal = ({
  leave,
  employee,
  isOpen,
  setIsOpen,
}: ErrorModalProps) => {
  const { setRefreshEffect } = useContext(storeContext);
  const { onOpenChange } = useDisclosure();

  const handleApprove = async () => {
    fetch(`/api/manager/leaves/${leave._id}/approve`, {
      method: "PATCH",
    }).then((res) => {
      if (res.ok) {
        setRefreshEffect((prev: boolean) => !prev);
        setIsOpen(false);
      }
    });
  };
  const handleReject = async () => {
    fetch(`/api/manager/leaves/${leave._id}/reject`, {
      method: "PATCH",
    }).then(() => {
      setRefreshEffect((prev: boolean) => !prev);
      setIsOpen(false);
    });
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirmation
            </ModalHeader>
            <ModalBody>
              <div>
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <div>
                        {employee.name} {employee.lastname}
                      </div>
                      <div className="text-xs text-gray-400">
                        {employee.email}
                      </div>
                    </div>
                    <Chip
                      size="sm"
                      radius="none"
                      variant="flat"
                      color={
                        leave.status === "pending"
                          ? "warning"
                          : leave.status === "approved"
                          ? "success"
                          : "danger"
                      }
                    >
                      {leave.type === "vacation"
                        ? "Payé"
                        : leave.type === "sick"
                        ? "Maladie"
                        : leave.type === "unpaid" && "Sans Solde"}
                    </Chip>
                  </div>
                  <div className="flex gap-10">
                    <div>
                      <div className="text-sm text-gray-400">Date Début</div>
                      <div>
                        {moment(leave.start_date).format("DD MMMM, YYYY")}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Date Fin</div>
                      <div>
                        {moment(leave.end_date).format("DD MMMM, YYYY")}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Durée</div>
                      <div>
                        {leave.duration >= 1 && leave.duration}{" "}
                        {leave.duration > 1
                          ? "jours"
                          : leave.duration == 1 && "jour"}{" "}
                        {leave.afternoon && "Après-midi"}
                        {leave.morning && "Matin"}
                      </div>
                    </div>
                  </div>
                  {leave.comment && (
                    <div>
                      <div className="text-sm text-gray-400">Commentaire</div>
                      <div>{leave.comment}</div>
                    </div>
                  )}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="mr-auto"
                color="default"
                variant="flat"
                onPress={onClose}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Fermer
              </Button>
              <Button
                color="danger"
                variant="flat"
                onPress={onClose}
                onClick={() => {
                  handleReject();
                }}
              >
                Rejeter
              </Button>
              <Button
                color="success"
                variant="flat"
                onPress={onClose}
                onClick={() => {
                  handleApprove();
                }}
              >
                Approuver
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default LeaveApprovalModal;
