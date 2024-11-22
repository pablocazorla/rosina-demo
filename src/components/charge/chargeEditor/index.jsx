import {
  DateInput,
  Form,
  Input,
  InputContainer,
  Label,
  PhoneInput,
  Select,
  Textarea,
} from "@/components/form";
import Button from "@/components/button";
import I18N from "@/i18n";
import LoadingBox from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import useChargeEditor from "./useChargeEditor";
// import { ITEM_TYPES, ITEM_CATEGORIES } from "@/config/chargeTypes";
import DeleteButton from "@/components/deleteButton";
import ClientSearch from "@/components/client/clientSearch";
import Modal from "@/components/modal";
import ClientEditor from "@/components/client/clientEditor";
import statusTypesCharges from "@/config/statusCharge";

const ChargeEditor = ({ charge, onClose, afterEdited }) => {
  const {
    defaultClient,
    setDefaultClient,
    toggleNewClient,
    showNewClient,
    afterNewClient,
    //
    data,
    onSubmit,
    loading,
    error,
    validations,
    afterDelete,
  } = useChargeEditor(charge, onClose, afterEdited);

  return (
    <>
      <div className="relative">
        <Form onSubmit={onSubmit} validations={validations}>
          <Label text="form.Client" required />
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
              name="client_name"
              value={defaultClient?.name || ""}
            />
            <input
              type="hidden"
              name="client_id"
              value={defaultClient?.id || ""}
            />
          </InputContainer>
          <InputContainer>
            <Label text="form.charge.description" />
            <Textarea
              name="description"
              data={data}
              placeholder="form.charge.description"
            />
          </InputContainer>
          <div className="max-w-44">
            <InputContainer validate="cost">
              <Label text="form.Cost" required />
              <Input type="number" name="cost" icon="money" data={data} />
            </InputContainer>
          </div>
          <InputContainer validate="status">
            <Label text="form.Status" required />
            <Select
              data={data}
              name="status"
              options={statusTypesCharges}
              icon="status"
              customRenderTag={(text, value) => {
                return (
                  <div
                    className="text-sm text-white py-1 px-5 rounded font-bold text-center"
                    style={{
                      backgroundColor: statusTypesCharges.find(
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
          <div className="flex charges-stretch gap-4 justify-center pt-4 pb-8">
            {onClose ? (
              <div
                className="font-bold hover:bg-gray-400 hover:text-white border-2 border-gray-400 text-gray-500 py-3 px-4 leading-none rounded-md transition-colors cursor-pointer"
                onClick={onClose}
              >
                <I18N id="form.Cancel" />
              </div>
            ) : null}
            <Button type="submit">
              <I18N id="form.Save" />
            </Button>
          </div>
        </Form>
        <DeleteButton
          type="CHARGE"
          id={charge?.id}
          name={charge?.client_name}
          afterDelete={afterDelete}
        />
        <LoadingBox loading={loading} />
      </div>
      <Modal
        isOpen={showNewClient}
        onClose={toggleNewClient}
        title="client.editor.title.new"
      >
        <ClientEditor onClose={toggleNewClient} afterEdited={afterNewClient} />
      </Modal>
    </>
  );
};

export default ChargeEditor;
