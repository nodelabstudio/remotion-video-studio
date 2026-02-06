import React, { useCallback } from "react";
import { useRemotionEnvironment } from "remotion";

interface StudioPresetExportProps<T> {
  compositionId: string;
  props: T;
  filename?: string;
}

export const StudioPresetExport = <T,>({
  compositionId,
  props,
  filename,
}: StudioPresetExportProps<T>) => {
  const env = useRemotionEnvironment();

  const handleDownload = useCallback(() => {
    if (typeof window === "undefined") return;
    const blob = new Blob([JSON.stringify(props, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename ?? `${compositionId}-props.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }, [compositionId, filename, props]);

  const handleCopy = useCallback(async () => {
    if (typeof navigator === "undefined") return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(props, null, 2));
    } catch {
      // Ignore clipboard errors
    }
  }, [props]);

  if (!env.isStudio) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        zIndex: 9999,
        display: "flex",
        gap: 8,
        pointerEvents: "auto",
      }}
    >
      <button
        type="button"
        onClick={handleDownload}
        style={{
          background: "rgba(0, 0, 0, 0.6)",
          color: "#ffffff",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 6,
          padding: "6px 10px",
          fontSize: 12,
          cursor: "pointer",
        }}
      >
        Download Props
      </button>
      <button
        type="button"
        onClick={handleCopy}
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          color: "#111111",
          border: "1px solid rgba(0,0,0,0.15)",
          borderRadius: 6,
          padding: "6px 10px",
          fontSize: 12,
          cursor: "pointer",
        }}
      >
        Copy JSON
      </button>
    </div>
  );
};
