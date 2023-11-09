import { useState, useEffect } from "react";

export function useDebouceQuery(query: string, time = 750) {
  const [debounceQuery, setDebounceQuery] = useState(query);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, time);
    return () => clearTimeout(timeout);
  }, [query, time]);

  return debounceQuery;
}
