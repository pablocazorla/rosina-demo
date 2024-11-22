"use client";

import Card from "@/components/card";
import useClients from "./useClients";
import Search from "@/components/searchTable";
import I18N from "@/i18n";
import Table from "@/components/table";
import Pagination from "@/components/pagination";
import LoadingBox from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import { formatPhone } from "@/utils/phone";
import { formatBirthday } from "@/utils/dateUtils";
import Modal from "@/components/modal";
import ClientEditor from "@/components/client/clientEditor";
import Icon from "@/components/icon";
import Container from "@/components/container";

const ClientsPage = () => {
  const {
    data,
    filter,
    setFilter,
    loading,
    error, //
    clientToEdit,
    showClientEditor,
    closeClientEditor,
    onEditClient,
    onCreateClient,
    afterEdited,
  } = useClients();

  return (
    <Container>
      <h1 className="font-bold text-2xl mb-3">
        <I18N id="Clients" />
      </h1>
      <Card>
        <div className="p-2 flex justify-between items-center gap-3">
          <Search filter={filter} setFilter={setFilter} />
          <button
            className="flex items-center gap-1 bg-secondary text-white font-bold text-sm px-4 py-1 rounded-md hover:bg-black transition-colors"
            onClick={onCreateClient}
          >
            <Icon type="user" />
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
                header: "client.table.name",
                value: "name",
                sort: true,
                render: (item) => {
                  return (
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        onEditClient(item);
                      }}
                    >
                      <div className="font-bold">{item.name}</div>
                      {item.dni ? (
                        <div className="text-[10px]">{`DNI: ${item.dni}`}</div>
                      ) : (
                        "-"
                      )}
                    </div>
                  );
                },
              },
              {
                header: "client.table.birthday",
                value: "birthday",
                render: (item) => {
                  return formatBirthday(item?.birthday);
                },
              },
              {
                header: "client.table.phone",
                value: "phone",
                render: (item) => {
                  return formatPhone(item?.phone);
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
        isOpen={showClientEditor}
        onClose={closeClientEditor}
        title={`client.editor.title.${clientToEdit ? "edit" : "new"}`}
      >
        <ClientEditor
          client={clientToEdit}
          onClose={closeClientEditor}
          afterEdited={afterEdited}
        />
      </Modal>
    </Container>
  );
};

export default ClientsPage;
