// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { makeStyles } from "tss-react/mui";

export default makeStyles()(({ palette }) => ({
    /* eslint-disable tss-unused-classes/unused-classes */
    human : {
        color: palette.primary.main,
        background: palette.background.paper,
        fontWeight: "bold",
    },
    robot: {
        color: palette.secondary.main,
        background: palette.background.default,
    },
    /* eslint-enable tss-unused-classes/unused-classes */
}));