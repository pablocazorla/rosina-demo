import useFetch from "@/hooks/useFetch";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const keywordLimit = 2;

const useClientSearch = (startName) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);
  /////////////////////////////////////////////

  const [inputValue, setInputValue] = useState(startName);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    let timer = setTimeout(() => {
      if (inputValue) {
        setKeyword(inputValue);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [inputValue]);
  /////////////////////////////////////////////

  const [getClients, clients, loading] = useFetch({
    endpoint: "CLIENT_LIST",
    //  autoLoad: true,
  });

  useEffect(() => {
    if (keyword.length >= keywordLimit) {
      getClients({ params: { search: keyword } });
    }
  }, [keyword, getClients]);

  const list = useMemo(() => {
    if (keyword.length < keywordLimit) {
      return [];
    }
    if (clients && clients.data && clients.data.length) {
      return clients.data.map(({ id, name }) => {
        return { id, name };
      });
    }
    return [];
  }, [clients, keyword]);

  return { inputRef, inputValue, setInputValue, loading, list };
};

export default useClientSearch;
