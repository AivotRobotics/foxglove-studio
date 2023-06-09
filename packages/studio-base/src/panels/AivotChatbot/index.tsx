// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
import Panel from "@foxglove/studio-base/components/Panel";
import AivotChatbotPanel from "@foxglove/studio-base/panels/AivotChatbot/ChatbotPanel"
import {AivotChatbotConfig} from "@foxglove/studio-base/panels/AivotChatbot/types";

const defaultConfig: AivotChatbotConfig = {
    namespace: "/aivot_motion",
}

export default Panel(
    Object.assign(AivotChatbotPanel, {
        panelType: "AivotChatbot",
        defaultConfig,
    }),
);
