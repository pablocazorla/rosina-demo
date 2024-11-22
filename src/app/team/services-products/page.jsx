"use client";

import Card from "@/components/card";
import useItems from "./useItems";
import Search from "@/components/searchTable";
import I18N from "@/i18n";
import Table from "@/components/table";
import LoadingBox from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import Modal from "@/components/modal";
import ItemEditor from "@/components/item/itemEditor";
import Icon from "@/components/icon";
import moneyString from "@/utils/money";
import Container from "@/components/container";

const ItemsPage = () => {
  const {
    data,
    filter,
    setFilter,
    loading,
    error, //
    itemToEdit,
    showItemEditor,
    closeItemEditor,
    onEditItem,
    onCreateItem,
    afterEdited,
  } = useItems();

  return (
    <Container>
      <h1 className="font-bold text-2xl mb-3">
        <I18N id="services_products" />
      </h1>
      <Card>
        <div className="p-2 flex justify-between items-center gap-3">
          <Search filter={filter} setFilter={setFilter} />

          <button
            className="flex items-center gap-1 bg-secondary text-white font-bold text-sm px-4 py-1 rounded-md hover:bg-black transition-colors"
            onClick={onCreateItem}
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
                header: "item.table.name",
                value: "name",
                sort: true,
                render: (item) => {
                  return (
                    <div
                      className="cursor-pointer py-1"
                      onClick={() => {
                        onEditItem(item);
                      }}
                    >
                      <div className="font-bold leading-none mb-1">
                        {item.name}
                      </div>
                      {item.description ? (
                        <div className="text-[10px] leading-none text-gray-600">
                          {item.description}
                        </div>
                      ) : null}
                    </div>
                  );
                },
              },
              {
                header: "item.table.categories",
                value: "categories",
                sort: true,
                render: (item) => {
                  return (
                    <div className="py-1 text-gray-800">
                      <div className="leading-none mb-1">
                        {item.categories || "-"}
                      </div>
                      <div className="text-[10px] leading-none ">
                        {item.type || "-"}
                      </div>
                    </div>
                  );
                },
              },
              {
                header: "item.table.cost",
                value: "cost",
                sort: true,
                render: (item) => {
                  return moneyString(item?.cost);
                },
              },
            ]}
          />
          <div className="h-3 flex justify-end"></div>
          <LoadingBox loading={loading} />
        </div>
      </Card>
      <Modal
        isOpen={showItemEditor}
        onClose={closeItemEditor}
        title={`item.editor.title.${itemToEdit ? "edit" : "new"}`}
      >
        <ItemEditor
          item={itemToEdit}
          onClose={closeItemEditor}
          afterEdited={afterEdited}
        />
      </Modal>
    </Container>
  );
};

export default ItemsPage;
