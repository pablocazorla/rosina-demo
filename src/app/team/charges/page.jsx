"use client";

import Card from "@/components/card";
import useCharges from "./useCharges";
import Search from "@/components/searchTable";
import I18N from "@/i18n";
import Table from "@/components/table";
import LoadingBox from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import Modal from "@/components/modal";
import ChargeEditor from "@/components/charge/chargeEditor";
import Icon from "@/components/icon";
import moneyString from "@/utils/money";
import { formatDateTable } from "@/utils/dateUtils";
import Container from "@/components/container";
import Pagination from "@/components/pagination";
import StatusBadge from "@/components/statusBadge";

const ChargesPage = () => {
  const {
    data,
    filter,
    setFilter,
    loading,
    error, //
    chargeToEdit,
    showChargeEditor,
    closeChargeEditor,
    onEditCharge,
    onCreateCharge,
    afterEdited,
  } = useCharges();

  return (
    <Container full>
      <h1 className="font-bold text-2xl mb-3">
        <I18N id="charges" />
      </h1>
      <Card>
        <div className="p-2 flex justify-between items-center gap-3">
          <Search filter={filter} setFilter={setFilter} />

          <button
            className="flex items-center gap-1 bg-secondary text-white font-bold text-sm px-4 py-1 rounded-md hover:bg-black transition-colors"
            onClick={onCreateCharge}
          >
            <Icon type="plus" />
            <I18N id="new" />
          </button>
        </div>
        <div className="relative">
          <ErrorAlert error={error} />
          <Table
            data={data}
            filter={filter}
            setFilter={setFilter}
            columns={[
              {
                header: "charge.table.client",
                value: "client_name",
                sort: true,
                render: (charge) => {
                  return (
                    <div
                      className="cursor-pointer py-1"
                      onClick={() => {
                        onEditCharge(charge);
                      }}
                    >
                      <div className="font-bold leading-none mb-1">
                        {charge.client_name}
                      </div>
                    </div>
                  );
                },
              },
              {
                header: "charge.table.description",
                value: "description",
                render: (charge) => {
                  return (
                    <div className="py-1 text-gray-800">
                      <div className="text-[10px] leading-none ">
                        {charge.description || "-"}
                      </div>
                    </div>
                  );
                },
              },
              {
                header: "charge.table.date",
                value: "date_created",
                sort: true,
                render: (item) => {
                  return (
                    <div className="text-xs leading-none ">
                      {formatDateTable(item?.date_created)}
                    </div>
                  );
                },
              },
              {
                header: "charge.table.status",
                value: "status",
                sort: true,
                render: (charge) => {
                  return <StatusBadge status={charge.status} isCharge />;
                },
              },
              {
                header: "charge.table.cost",
                value: "cost",
                sort: true,
                render: (charge) => {
                  return moneyString(charge?.cost);
                },
              },
            ]}
          />
          <div className="p-3 flex justify-end">
            <Pagination data={data} filter={filter} setFilter={setFilter} />
          </div>
          <LoadingBox loading={loading} />
        </div>
      </Card>
      <Modal
        isOpen={showChargeEditor}
        onClose={closeChargeEditor}
        title={`charge.editor.title.${chargeToEdit ? "edit" : "new"}`}
      >
        <ChargeEditor
          charge={chargeToEdit}
          onClose={closeChargeEditor}
          afterEdited={afterEdited}
        />
      </Modal>
    </Container>
  );
};

export default ChargesPage;
