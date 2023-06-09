// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { StoryObj } from "@storybook/react";

import VariableSliderPanel from "@foxglove/studio-base/panels/VariableSlider/index";
import PanelSetup from "@foxglove/studio-base/stories/PanelSetup";

const fixture = {
  topics: [],
  datatypes: new Map(
    Object.entries({
      Foo: { definitions: [] },
    }),
  ),
  frame: {},
  capabilities: [],
  globalVariables: { globalVariable: 3.5 },
};

export default {
  title: "panels/VariableSlider",
  component: VariableSliderPanel,
};

export const Example: StoryObj = {
  render: () => {
    return (
      <PanelSetup fixture={fixture}>
        <VariableSliderPanel />
      </PanelSetup>
    );
  },
};

export const NarrowLayout: StoryObj = {
  render: () => {
    return (
      <PanelSetup fixture={fixture}>
        <div style={{ width: 400 }}>
          <VariableSliderPanel />
        </div>
      </PanelSetup>
    );
  },
};

export const WithSettings: StoryObj = {
  render: function Story() {
    return (
      <PanelSetup fixture={fixture} includeSettings>
        <VariableSliderPanel />
      </PanelSetup>
    );
  },

  parameters: {
    colorScheme: "light",
  },
};
