import { useState, useCallback, useRef, useEffect } from "react";

export type LoadingState = "idle" | "loading" | "success" | "error";

interface UseVerseLoaderOptions<T> {
  fetchFn: () => Promise<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  autoLoad?: boolean;
}

interface UseVerseLoaderReturn<T> {
  data: T | null;
  state: LoadingState;
  error: Error | null;
  load: () => Promise<void>;
  retry: () => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export function useVerseLoader<T>({
  fetchFn,
  onSuccess,
  onError,
  autoLoad = true,
}: UseVerseLoaderOptions<T>): UseVerseLoaderReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [state, setState] = useState<LoadingState>("idle");
  const [error, setError] = useState<Error | null>(null);
  
  // Use refs to avoid stale closures
  const fetchFnRef = useRef(fetchFn);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  
  // Update refs on each render
  useEffect(() => {
    fetchFnRef.current = fetchFn;
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
  });

  const load = useCallback(async () => {
    setState("loading");
    setError(null);

    try {
      const result = await fetchFnRef.current();
      setData(result);
      setState("success");
      onSuccessRef.current?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to load data");
      setError(error);
      setState("error");
      onErrorRef.current?.(error);
    }
  }, []);

  const retry = useCallback(async () => {
    await load();
  }, [load]);

  // Auto-load on mount
  useEffect(() => {
    if (autoLoad) {
      load();
    }
  }, [autoLoad, load]);

  return {
    data,
    state,
    error,
    load,
    retry,
    isLoading: state === "loading",
    isError: state === "error",
    isSuccess: state === "success",
  };
}
