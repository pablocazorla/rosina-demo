import Modal from "@/components/modal";
import {
  DateInput,
  DurationInput,
  Form,
  HourInput,
  Input,
  InputContainer,
  Label,
  Select,
  Textarea,
} from "@/components/form";
import useTurnEditor from "./useTurnEditor";
import Button from "@/components/button";
import ClientSearch from "@/components/client/clientSearch";
import I18N from "@/i18n";
import { locationOptions } from "@/config/locations";
import statusTypes from "@/config/status";
import LoadingBox from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import ClientEditor from "@/components/client/clientEditor";
import ClientHistorial from "@/components/client/clientHistorial";
import clsx from "clsx";
import DeleteButton from "@/components/deleteButton";

const TurnEditor = ({ turn, dataForNewTurn, onClose }) => {
  const {
    dataInitial,
    //
    onSubmit,
    itemOptions,
    defaultClient,
    setDefaultClient,
    cost,
    setCost,
    onChangeItems,
    loading,
    error,
    validations,
    //
    showNewClient,
    toggleNewClient,
    afterNewClient,
    //
    showClientHistorial,
    toggleClientHistorial,
    afterCopyHistorial,
    afterDelete,
  } = useTurnEditor(turn, dataForNewTurn, onClose);

  return (
    <>
      <div className="relative">
        <Form onSubmit={onSubmit} validations={validations}>
          <Label text="form.Client" />
          <div className="flex items-stretch">
            <div className="grow">
              <ClientSearch
                lg
                defaultClient={defaultClient}
                onChange={setDefaultClient}
                icon="location"
              />
            </div>
            <div
              className="cursor-pointer bg-gray-400 hover:bg-black transition-colors font-bold text-white px-4  rounded-tr rounded-br text-sm grid place-items-center"
              onClick={toggleNewClient}
            >
              <I18N id="form.NewClient" />
            </div>
          </div>
          <InputContainer validate="client_id">
            <input
              type="hidden"
              name="client_id"
              value={defaultClient?.id || ""}
            />
            <input
              type="hidden"
              name="client_name"
              value={defaultClient?.name || ""}
            />
          </InputContainer>
          <InputContainer>
            <Label text="form.Fecha" />
            <DateInput name="day" data={dataInitial} />
          </InputContainer>
          <div className="flex">
            <div className="w-1/2 pr-2">
              <InputContainer>
                <Label text="form.Hour" />
                <HourInput name="startTime" data={dataInitial} />
              </InputContainer>
            </div>
            <div className="w-1/2 pl-2">
              <InputContainer>
                <Label text="form.Duration" />
                <DurationInput name="duration" data={dataInitial} />
              </InputContainer>
            </div>
          </div>
          <InputContainer validate="item_ids">
            <div className="flex items-center justify-between gap-2">
              <Label text="form.ItemIds" required />
              {defaultClient ? (
                <div
                  className="text-sm px-2 cursor-pointer font-bold text-secondary hover:text-primary"
                  onClick={toggleClientHistorial}
                >
                  <I18N id="client.historial.title" />
                </div>
              ) : null}
            </div>
            <Select
              data={dataInitial}
              name="item_ids"
              options={itemOptions}
              multiple
              icon="location"
              onChange={onChangeItems}
            />
          </InputContainer>
          <InputContainer>
            <Label text="form.Descripcion" />
            <Textarea data={dataInitial} name="description" />
          </InputContainer>

          <div className="flex gap-4">
            <div className="w-2/5">
              <InputContainer validate="cost">
                <Label text="form.Cost" required />
                <Input
                  type="number"
                  name="cost"
                  icon="money"
                  data={{ cost }}
                  onChange={({ target }) => {
                    setCost(parseFloat(target.value));
                  }}
                />
              </InputContainer>
            </div>
            <div className="w-3/5">
              <InputContainer validate="location">
                <Label text="form.Location" required />
                <Select
                  data={dataInitial}
                  name="location"
                  options={locationOptions}
                  icon="location"
                  customRenderTag={(text, value) => {
                    return (
                      <div
                        className="text-sm text-white py-1 px-5 rounded font-bold text-center"
                        style={{
                          backgroundColor: locationOptions.find(
                            (s) => s.value === value
                          )?.color,
                        }}
                      >
                        {text}
                      </div>
                    );
                  }}
                  customRenderOption={(option) => {
                    return (
                      <div
                        className="text-sm text-white py-1 px-5 rounded font-bold text-center mb-1"
                        style={{ backgroundColor: option.color }}
                      >
                        {option.text}
                      </div>
                    );
                  }}
                />
              </InputContainer>
            </div>
          </div>
          <InputContainer validate="status">
            <Label text="form.Status" required />
            <Select
              data={dataInitial}
              name="status"
              options={statusTypes}
              icon="status"
              customRenderTag={(text, value) => {
                return (
                  <div
                    className="text-sm text-white py-1 px-5 rounded font-bold text-center"
                    style={{
                      backgroundColor: statusTypes.find(
                        (s) => s.value === value
                      )?.color,
                    }}
                  >
                    {text}
                  </div>
                );
              }}
              customRenderOption={(option) => {
                return (
                  <div
                    className="text-sm text-white py-1 px-5 rounded font-bold text-center mb-1"
                    style={{ backgroundColor: option.color }}
                  >
                    {option.text}
                  </div>
                );
              }}
            />
          </InputContainer>
          <ErrorAlert error={error} />
          <div
            className={clsx("flex items-center gap-4 pt-4 pb-8", {
              "justify-between": turn,
              "justify-center": !turn,
            })}
          >
            {turn ? (
              <DeleteButton
                type="TURN"
                id={turn.id}
                name="turn "
                afterDelete={afterDelete}
              />
            ) : null}

            <div className="flex items-stretch gap-4">
              <div
                className="font-bold hover:bg-gray-400 hover:text-white border-2 border-gray-400 text-gray-500 py-3 px-4 leading-none rounded-md transition-colors cursor-pointer"
                onClick={onClose}
              >
                <I18N id="form.Cancel" />
              </div>
              <Button type="submit">
                <I18N id="form.Save" />
              </Button>
            </div>
          </div>
        </Form>
        <LoadingBox loading={loading} />
      </div>
      <Modal
        isOpen={showNewClient}
        onClose={toggleNewClient}
        title="client.editor.title.new"
      >
        <ClientEditor onClose={toggleNewClient} afterEdited={afterNewClient} />
      </Modal>
      <Modal
        isOpen={showClientHistorial}
        onClose={toggleClientHistorial}
        title="client.historial.title"
      >
        <ClientHistorial
          client={defaultClient}
          onClose={toggleClientHistorial}
          afterCopyHistorial={afterCopyHistorial}
        />
      </Modal>
    </>
  );
};

export default TurnEditor;
