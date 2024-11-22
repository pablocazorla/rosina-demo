import {
  DateInput,
  Form,
  Input,
  InputContainer,
  Label,
  PhoneInput,
} from "@/components/form";
import Button from "@/components/button";
import I18N from "@/i18n";
import LoadingBox from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import useClientEditor from "./useClientEditor";
import Modal from "@/components/modal";
import ClientHistorial from "../clientHistorial";
import DeleteButton from "@/components/deleteButton";
import Icon from "@/components/icon";

const ClientEditor = ({ client, onClose, afterEdited }) => {
  const {
    data,
    onSubmit,
    loading,
    error,
    validations, //
    showClientHistorial,
    toggleClientHistorial,
    afterDelete,
  } = useClientEditor(client, onClose, afterEdited);

  return (
    <>
      <div className="relative">
        <Form onSubmit={onSubmit} validations={validations}>
          <InputContainer validate="name">
            <div className="flex items-center justify-between gap-2">
              <Label text="form.client.name" required />
              {client ? (
                <div
                  className="text-sm px-2 cursor-pointer font-bold text-secondary hover:text-primary"
                  onClick={toggleClientHistorial}
                >
                  <I18N id="client.historial.title" />
                </div>
              ) : null}
            </div>

            <Input
              type="text"
              name="name"
              data={data}
              icon="user"
              placeholder="form.client.name"
            />
          </InputContainer>
          <div className="flex gap-4">
            <div className="grow">
              <InputContainer>
                <Label text="form.client.birthday" />
                <DateInput name="birthday" data={data} icon="calendar" />
              </InputContainer>
            </div>
            <div className="w-44">
              <InputContainer>
                <Label text="form.client.dni" />
                <Input
                  type="text"
                  name="dni"
                  data={data}
                  icon="user"
                  placeholder="form.client.dni"
                />
              </InputContainer>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 pr-2">
              <InputContainer>
                <Label text="form.client.phone" />
                <PhoneInput data={data} name="phone" />
              </InputContainer>
            </div>
            <div className="w-1/2 pl-2">
              <InputContainer>
                <Label text="form.client.phone_contact" />
                <PhoneInput data={data} name="phone_contact" />
              </InputContainer>
            </div>
          </div>
          <ErrorAlert error={error} />
          <div className="flex items-stretch gap-4 justify-center pt-4 pb-8">
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
        <LoadingBox loading={loading} />
      </div>
      <DeleteButton
        type="CLIENT"
        id={client?.id}
        name={client?.name}
        afterDelete={afterDelete}
      />
      <Modal
        isOpen={showClientHistorial}
        onClose={toggleClientHistorial}
        title="client.historial.title"
      >
        <ClientHistorial client={client} onClose={toggleClientHistorial} />
      </Modal>
    </>
  );
};

export default ClientEditor;
