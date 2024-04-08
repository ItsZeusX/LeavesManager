import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import { ReactNode } from "react";

interface ErrorModalProps {
  title: string;
  body: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const ErrorModal = ({ title, body, isOpen, setIsOpen }: ErrorModalProps) => {
  const { onOpenChange } = useDisclosure();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{body}</ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ErrorModal;
