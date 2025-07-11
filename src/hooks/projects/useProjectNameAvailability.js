import { useState, useEffect, useRef } from "react";
import { ApiCall } from "@/utils/ApiCall";
import useDebounce from "../common/useDebounce";

const useProjectNameAvailability = (name) => {
  const [message, setMessage] = useState("");
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(null);
  const debouncedName = useDebounce(name, 300);
  const checkAvailability = async (projectName) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);

    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/check-boardName-duplicates`,
      method: "POST",
      body: { name: projectName },
      signal: controller.signal,
    });

    if(res.aborted){
      return null;
    }

    if (res.error) {
      console.error("Error checking project name:", res.error);
      setMessage(res.error.message);
      setAvailable(false);
      setLoading(false);
      return;
    }

    setMessage(res.data?.message || "");
    setAvailable(res.data?.createName || false);
    setLoading(false);
  };

  useEffect(() => {
    if (!debouncedName || name.trim().length < 3 || name.trim().length > 50) {
      setMessage("");
      setAvailable(false);
      setLoading(false);
      return;
    }

  

    checkAvailability(debouncedName);

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedName]);

  return [message, loading, available];
};

export default useProjectNameAvailability;
