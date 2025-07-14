"use client";
import { useState, useCallback } from "react";
import { API_CALL_STATES } from "@/constants";

export default function useApiCallState() {
  const [status, setStatus] = useState(API_CALL_STATES.IDLE);
  const [error, setError] = useState(null);

  const startLoading = useCallback(() => {
    setStatus(API_CALL_STATES.LOADING);
    setError(null);
  }, []);

  const setSuccess = useCallback(() => {
    setStatus(API_CALL_STATES.SUCCESS);
  }, []);

  const setFailure = useCallback((err) => {
    setStatus(API_CALL_STATES.ERROR);
    setError(
      typeof err === "string" ? err : err?.message || "Something went wrong"
    );
  }, []);

  const reset = useCallback(() => {
    setStatus(API_CALL_STATES.IDLE);
    setError(null);
  }, []);

  return {
    status,
    error,
    loading: status === API_CALL_STATES.LOADING,
    startLoading,
    setSuccess,
    setFailure,
    reset,
  };
}
