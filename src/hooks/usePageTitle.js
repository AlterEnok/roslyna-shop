import { useEffect } from "react";


export default function usePageTitle(title, suffix = "Рослина Карпат") {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${suffix}` : suffix;
    document.title = fullTitle;
  }, [title, suffix]);
}
