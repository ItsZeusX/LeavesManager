import { Button } from "@nextui-org/react";
import React from "react";
import { MdLogout } from "react-icons/md";

const LogoutButton = () => {
  const handleLogout = () => {
    fetch("/api/logout").then(() => {
      window.location.href = "/login";
    });
  };
  return (
    <Button
      startContent={
        <div>
          <MdLogout size="16px" />
        </div>
      }
      className="w-full"
      color="danger"
      variant="flat"
      onClick={handleLogout}
    >
      <div className="hidden xl:block">LOGOUT</div>
    </Button>
  );
};

export default LogoutButton;
