import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// LOCALE --------------------------------------------------------
const days = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];
const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];
const locale: any = {
  localize: {
    day: (n: any) => days[n],
    month: (n: any) => months[n],
  },
  formatLong: {
    date: () => "mm/dd/yyyy",
  },
};
//---------------------------------------------------------------
interface CalendarProps {
  date: any;
  setDate: any;
  label?: string;
  minDate?: Date;
}
const Calendar = ({ date, setDate, label, minDate }: CalendarProps) => {
  return (
    <div className="w-full py-2 px-3 bg-gray-100 rounded-lg hover:bg-zinc-200">
      <div className="text-xs text-gray-700">
        {label ? label : "Date"} <span className="text-red-600">*</span>
      </div>
      <DatePicker
        locale={locale}
        selected={date}
        dateFormat="dd MMMM, yyyy"
        className=" rounded-xl p-2 w-full focus:outline-none focus:ring-0 bg-transparent"
        value={date}
        minDate={minDate}
        filterDate={isWeekday}
        onChange={(date) => setDate(date)}
        wrapperClassName="w-full"
      ></DatePicker>
    </div>
  );
};

const isWeekday = (date: Date) => {
  const day = date.getDay();
  return day !== 0 && day !== 6;
};

export default Calendar;
