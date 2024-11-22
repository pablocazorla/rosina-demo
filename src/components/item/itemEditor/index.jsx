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
import useItemEditor from "./useItemEditor";
import { ITEM_TYPES, ITEM_CATEGORIES } from "@/config/itemTypes";
import DeleteButton from "@/components/deleteButton";

const ItemEditor = ({ item, onClose, afterEdited }) => {
  const { data, onSubmit, loading, error, validations, afterDelete } =
    useItemEditor(item, onClose, afterEdited);

  return (
    <>
      <div className="relative">
        <Form onSubmit={onSubmit} validations={validations}>
          <InputContainer validate="name">
            <Label text="form.item.name" required />
            <Input
              type="text"
              name="name"
              data={data}
              // icon="user"
              placeholder="form.item.name"
            />
          </InputContainer>
          <div className="flex">
            <div className="w-1/2 pr-2">
              <InputContainer>
                <Label text="form.item.type" />
                <Select
                  data={{ type: data?.type ?? "Servicio" }}
                  name="type"
                  options={ITEM_TYPES}
                  // icon="location"
                />
              </InputContainer>
            </div>
            <div className="w-1/2 pl-2">
              <InputContainer validate="categories">
                <Label text="form.item.categories" required />
                <Select
                  data={data}
                  name="categories"
                  options={ITEM_CATEGORIES}
                  // icon="location"
                />
              </InputContainer>
            </div>
          </div>

          <InputContainer>
            <Label text="form.item.description" />
            <Textarea
              name="description"
              data={data}
              placeholder="form.item.description"
            />
          </InputContainer>
          <div className="max-w-44">
            <InputContainer validate="cost">
              <Label text="form.Cost" required />
              <Input type="number" name="cost" icon="money" data={data} />
            </InputContainer>
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
        <DeleteButton
          type="ITEM"
          id={item?.id}
          name={item?.name}
          afterDelete={afterDelete}
        />
        <LoadingBox loading={loading} />
      </div>
    </>
  );
};

export default ItemEditor;
