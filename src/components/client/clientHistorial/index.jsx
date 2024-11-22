import { Label } from "@/components/form";
import useHistorial from "./useHistorial";
import TurnHistorial from "./turn";
import I18N from "@/i18n";
import LoadingBox from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";

const ClientHistorial = ({ client, onClose, afterCopyHistorial }) => {
  const { turns, loading, error, notFound } = useHistorial(client);

  return (
    <div className="relative">
      <Label text="form.Client" />
      <h2 className="text-xl font-bold">{client.name}</h2>
      <div className="py-5">
        <ErrorAlert error={error} />
        {turns.map((turn) => {
          return (
            <TurnHistorial
              key={turn.id}
              turn={turn}
              onClose={onClose}
              afterCopyHistorial={afterCopyHistorial}
            />
          );
        })}
        {notFound ? (
          <div className="text-center text-gray-500 text-sm border-t border-gray-300 py-2 font-bold">
            <I18N id="client.historial.notFound" />
          </div>
        ) : null}
      </div>
      <LoadingBox loading={loading} />
    </div>
  );
};

export default ClientHistorial;
