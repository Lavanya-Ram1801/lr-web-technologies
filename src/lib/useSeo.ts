import { useEffect } from "react";

const BASE = "L&R Web Technologies";

/** Sets the document title and meta description for the current page. */
export function useSeo(title: string, description: string) {
  useEffect(() => {
    document.title = title === BASE ? `${BASE} | Your Vision. Our Creation.` : `${title} | ${BASE}`;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
    const og = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (og) og.content = description;
  }, [title, description]);
}
