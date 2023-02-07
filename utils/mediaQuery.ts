import { useEffect, useState } from "react";

interface IEvent {
  matches: boolean;
}

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(true);

  useEffect(() => {
    const matchQueryList = window.matchMedia(query);

    const handleChange = (e: IEvent): void => {
      setMatches(e.matches);
    };

    matchQueryList.addEventListener("change", handleChange);

    return () => {
      matchQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};
