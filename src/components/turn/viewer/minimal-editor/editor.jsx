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
import useTurnEditor from "../../editor/useTurnEditor";
import LoadingBox from "@/components/loading";
import statusTypes from "@/config/status";
import ErrorAlert from "@/components/errorAlert";
import Button from "@/components/button";
import I18N from "@/i18n";

const Editor = ({ turn, onClose }) => {
  const { dataInitial, onSubmit, cost, setCost, loading, error, validations } =
    useTurnEditor(turn, null, onClose);
  return (
    <div className="relative">
      <Form onSubmit={onSubmit} validations={validations}>
        <div className="w-1/2 pr-2">
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
                    backgroundColor: statusTypes.find((s) => s.value === value)
                      ?.color,
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
        <div className="flex items-stretch gap-4 justify-center pt-4 pb-8">
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
      </Form>
      <LoadingBox loading={loading} />
    </div>
  );
};

export default Editor;
