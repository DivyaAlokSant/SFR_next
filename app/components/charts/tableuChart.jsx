"use client";
import React, { useEffect, useRef } from "react";

/**
 * @param {string} embedCode - The Tableau embed HTML (string) to render.
 * @param {string} [divId] - Optional unique id for the Tableau placeholder div.
 * @param {number} [height] - Optional height for the Tableau chart (in px).
 * @param {number|string} [width] - Optional width for the Tableau chart (in px or percent).
 */
export default function TableauChart({
  embedCode,
  divId = "tableauViz",
  height = 800,
  width = 1000,
}) {
  const containerRef = useRef(null);

  // Add :device=desktop to the embed URL if not present
  const processedEmbedCode = embedCode.replace(
    /(<param name=['"]?src['"]? value=['"]?[^'"]+\?[^'"]*)/g,
    (match) =>
      match.includes(":device=")
        ? match
        : match.replace("?", "?:device=desktop&")
  ).replace(
    /(src=['"][^'"]+\?[^'"]*)/g,
    (match) =>
      match.includes(":device=")
        ? match
        : match.replace("?", "?:device=desktop&")
  );

  useEffect(() => {
    const divElement = containerRef.current;
    if (!divElement) return;

    const vizElement = divElement.getElementsByTagName("object")[0];
    if (vizElement) {
      vizElement.style.width = "1000px";
      vizElement.style.height = "800px";

      if (
        !document.querySelector(
          'script[src="https://public.tableau.com/javascripts/api/viz_v1.js"]'
        )
      ) {
        const scriptElement = document.createElement("script");
        scriptElement.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
        vizElement.parentNode.insertBefore(scriptElement, vizElement);
      }
    }
  }, [processedEmbedCode]);

  return (
    <div
      ref={containerRef}
      id={divId || "tableauViz"}
      className="tableauPlaceholder my-4"
      style={{
        position: "relative",
        width: "1000px",
        minWidth: 1000,
        height: 800,
        minHeight: 800,
      }}
      dangerouslySetInnerHTML={{ __html: processedEmbedCode }}
    />
  );
}