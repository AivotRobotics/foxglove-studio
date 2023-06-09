// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { produce } from "immer";
import { useCallback, useEffect } from "react";

import { SettingsTreeAction, SettingsTreeNodes } from "@foxglove/studio";
import { usePanelSettingsTreeUpdate } from "@foxglove/studio-base/providers/PanelStateContextProvider";
import { SaveConfig } from "@foxglove/studio-base/types/panels";

import { AivotChatbotConfig } from "./types";

function buildSettingsTree(config: AivotChatbotConfig): SettingsTreeNodes {
  return {
    general: {
      label: "General",
      fields: {
        namespace: {
          label: "Namespace",
          input: "string",
          placeholder: "/aivot_motion",
          value: config.namespace
        },
      },
    },
  };
}

export function useAivotChatbotSettings(
  config: AivotChatbotConfig,
  saveConfig: SaveConfig<AivotChatbotConfig>,
): void {
  const updatePanelSettingsTree = usePanelSettingsTreeUpdate();

  const actionHandler = useCallback(
    (action: SettingsTreeAction) => {
      if (action.action !== "update") {
        return;
      }

      saveConfig(
        produce<AivotChatbotConfig>((draft: AivotChatbotConfig) => {
          const path = action.payload.path.slice(1);
          if (path[0] === "namespace" && action.payload.input === "string") {
              draft.namespace = action.payload.value!;
          }
        }),
      );
    },
    [saveConfig],
  );

  useEffect(() => {
    updatePanelSettingsTree({
      actionHandler,
      nodes: buildSettingsTree(config),
    });
  }, [actionHandler, config, updatePanelSettingsTree]);
}
