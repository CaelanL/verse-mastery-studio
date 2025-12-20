import { useState, useCallback } from "react";

export type LoadingState = "idle" | "loading" | "success" | "error";

interface UseVerseLoaderOptions<T> {
  fetchFn: () => Promise<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  // Simulate network delay for mock data (ms)
  simulateDelay?: number;
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
  simulateDelay = 0,
}: UseVerseLoaderOptions<T>): UseVerseLoaderReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [state, setState] = useState<LoadingState>("idle");
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async () => {
    setState("loading");
    setError(null);

    try {
      // Add simulated delay if needed (useful for showing loading states with mock data)
      if (simulateDelay > 0) {
        await new Promise(resolve => setTimeout(resolve, simulateDelay));
      }

      const result = await fetchFn();
      setData(result);
      setState("success");
      onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to load data");
      setError(error);
      setState("error");
      onError?.(error);
    }
  }, [fetchFn, onSuccess, onError, simulateDelay]);

  const retry = useCallback(async () => {
    await load();
  }, [load]);

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
