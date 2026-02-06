import { Internals, useRemotionEnvironment } from "remotion";
import { useEffect, useRef } from "react";

export const usePresetApplier = <T extends Record<string, unknown>>(
  compositionId: string,
  presetName: string,
  presets: Record<string, T>
) => {
  const env = useRemotionEnvironment();
  const lastApplied = useRef<string | null>(null);

  useEffect(() => {
    if (!env.isStudio) return;
    if (!presetName || presetName === "none") return;
    if (lastApplied.current === presetName) return;

    const preset = presets[presetName];
    if (!preset) return;

    const ref = Internals.editorPropsProviderRef;
    const current = ref.current?.getProps?.() ?? {};
    ref.current?.setProps?.({
      ...current,
      [compositionId]: { ...preset, presetName },
    });

    lastApplied.current = presetName;
  }, [compositionId, env.isStudio, presetName, presets]);
};
