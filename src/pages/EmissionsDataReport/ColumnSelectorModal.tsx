import type { DataColumn } from "@pages/EmissionsDataReport/EmissionsTable.tsx";
import { memo } from "react";
import Modal from "@components/modal";
import Checkbox from "@components/checkbox";
import Button from "@components/button";

export const ColumnSelectorModal = memo(
  function ColumnSelectorModal({
    isOpen,
    onClose,
    selectedColumns,
    selectedColumnsChanged,
  }: {
    isOpen: boolean;
    onClose: () => void;
    selectedColumns: DataColumn[];
    selectedColumnsChanged: (selectedColumns: DataColumn[]) => void;
  }) {
    const availableColumns: DataColumn[] = [
      "cement_co2",
      "cement_co2_per_capita",
      "co2",
      "co2_growth_abs",
      "co2_growth_prct",
      "co2_including_luc",
      "co2_including_luc_growth_abs",
      "co2_including_luc_growth_prct",
      "co2_including_luc_per_capita",
      "co2_including_luc_per_unit_energy",
      "co2_per_capita",
      "co2_per_unit_energy",
      "coal_co2",
      "coal_co2_per_capita",
      "cumulative_cement_co2",
      "cumulative_co2",
      "cumulative_co2_including_luc",
      "cumulative_coal_co2",
      "cumulative_flaring_co2",
      "cumulative_gas_co2",
      "cumulative_luc_co2",
      "cumulative_oil_co2",
      "cumulative_other_co2",
      "energy_per_capita",
      "flaring_co2",
      "flaring_co2_per_capita",
      "gas_co2",
      "gas_co2_per_capita",
      "ghg_excluding_lucf_per_capita",
      "ghg_per_capita",
      "land_use_change_co2",
      "land_use_change_co2_per_capita",
      "methane",
      "methane_per_capita",
      "nitrous_oxide",
      "nitrous_oxide_per_capita",
      "oil_co2",
      "oil_co2_per_capita",
      "other_co2_per_capita",
      "other_industry_co2",
      "population",
      "primary_energy_consumption",
      "share_global_cement_co2",
      "share_global_co2",
      "share_global_co2_including_luc",
      "share_global_coal_co2",
      "share_global_cumulative_cement_co2",
      "share_global_cumulative_co2",
      "share_global_cumulative_co2_including_luc",
      "share_global_cumulative_coal_co2",
      "share_global_cumulative_flaring_co2",
      "share_global_cumulative_gas_co2",
      "share_global_cumulative_luc_co2",
      "share_global_cumulative_oil_co2",
      "share_global_cumulative_other_co2",
      "share_global_flaring_co2",
      "share_global_gas_co2",
      "share_global_luc_co2",
      "share_global_oil_co2",
      "share_global_other_co2",
      "share_of_temperature_change_from_ghg",
      "temperature_change_from_ch4",
      "temperature_change_from_co2",
      "temperature_change_from_ghg",
      "temperature_change_from_n2o",
      "total_ghg",
      "total_ghg_excluding_lucf",
      "year",
    ];

    const handleChange = (colName: DataColumn, checked: boolean) => {
      const newColumns = checked
        ? [...selectedColumns, colName]
        : [...selectedColumns].filter((col) => col !== colName);
      selectedColumnsChanged(newColumns);
    };

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="max-h-[90vh] overflow-auto flex flex-col p-4 gap-4">
          <h2 className="text-xl font-bold">Select Columns</h2>
          <div className="overflow-auto">
            {availableColumns.map((col) => (
              <div key={col}>
                <Checkbox
                  label={col}
                  checked={selectedColumns.includes(col)}
                  onChange={() =>
                    handleChange(col, !selectedColumns.includes(col))
                  }
                />
              </div>
            ))}
          </div>
          <Button onClick={onClose}>Close</Button>
        </div>
      </Modal>
    );
  },
  (oldProps, newProps) => {
    return (
      oldProps.isOpen === newProps.isOpen &&
      oldProps.selectedColumns === newProps.selectedColumns &&
      oldProps.onClose === newProps.onClose &&
      oldProps.selectedColumnsChanged === newProps.selectedColumnsChanged
    );
  },
);
