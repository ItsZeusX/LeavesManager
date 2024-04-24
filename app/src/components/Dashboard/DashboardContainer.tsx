import { Button } from "@nextui-org/react";
import LeavesToCheck from "./LeavesToCheck";
import { MdDownload } from "react-icons/md";

const DashboardContainer = () => {
  const handleDownload = () => {
    //download the report
    fetch("/api/manager/report").then((response) => {
      response.blob().then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "report.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      });
    });
  };
  return (
    <div className="p-10 w-full h-full">
      <div className="ml-auto my-4 w-fit">
        <Button
          startContent={
            <div>
              <MdDownload size="16px" />
            </div>
          }
          color="primary"
          size="sm"
          variant="flat"
          onClick={handleDownload}
        >
          Generate Report
        </Button>
      </div>
      <div className="border rounded-xl">
        <LeavesToCheck />
      </div>
    </div>
  );
};

export default DashboardContainer;
