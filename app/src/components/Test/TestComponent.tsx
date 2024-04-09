import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

const TestComponent = () => {
  const [selectedType, setSelectedType] = useState("cp");
  const [selectedDuration, setSelectedDuration] = useState("one");

  const types = [
    {
      nom: "Congés payés",
      valeur: "cp",
    },
    {
      nom: "Congés sans solde",
      valeur: "cs",
    },
    {
      nom: "Congés maladie",
      valeur: "cm",
    },
  ];
  const durées = [
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
  return (
    <div className=" flex flex-col gap-5 m-5 p-5 font-light text-zinc-700 text-xl border border-zinc-300 w-full rounded-xl">
      <div>Ajouter Congés</div>
      {/* //Type */}
      <Select
        isRequired
        label="Type de congés"
        placeholder="Selectioner un type"
        defaultSelectedKeys={["cm"]}
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        {types.map((t: any) => (
          <SelectItem key={t.valeur} value={t.valeur}>
            {t.nom}
          </SelectItem>
        ))}
      </Select>
      {/* //Durée */}
      <Select
        label="Durée"
        isRequired
        placeholder="Selectioner une durée"
        defaultSelectedKeys={["one"]}
        value={selectedDuration}
        onChange={(e) => setSelectedDuration(e.target.value)}
      >
        {durées.map((d: any) => (
          <SelectItem key={d.valeur} value={d.valeur}>
            {d.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default TestComponent;
