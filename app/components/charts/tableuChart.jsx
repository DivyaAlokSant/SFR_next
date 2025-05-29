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
  height = 400,
  width = "100%",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const divElement = containerRef.current;
    if (!divElement) return;

    const vizElement = divElement.getElementsByTagName("object")[0];
    if (vizElement) {
      vizElement.style.width = typeof width === "number" ? `${width}px` : width;
      vizElement.style.height = height + "px";

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
  }, [embedCode, height, width]);

  return (
    <div 
      ref={containerRef}
      id={divId || "tableauViz"}
      className="tableauPlaceholder my-4"
      style={{
        position: "relative",
        width: typeof width === "number" ? `${width}px` : width,
        height,
      }}
      dangerouslySetInnerHTML={{ __html: embedCode }}
    />
  );
}
