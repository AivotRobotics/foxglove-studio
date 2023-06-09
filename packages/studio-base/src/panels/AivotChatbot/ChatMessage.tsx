// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
import {padStart} from "lodash";
import {fonts} from "@foxglove/studio-base/util/sharedStyleConstants";

import useMessageStyles from "@foxglove/studio-base/panels/AivotChatbot/useMessageStyles";
import {ChatMessageData, UserId, userIdToString} from "@foxglove/studio-base/panels/AivotChatbot/types";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()({
    root: {
        // Subsequent lines are indented bu using left padding, so we undo the padding for the first line
        // with textIndent
        textIndent: -20,
        paddingLeft: 20,
        whiteSpace: "pre-wrap",
        paddingTop: 1,
        paddingBottom: 1,
        lineHeight: 1,
        fontFamily: fonts.MONOSPACE,
    },
});

export default React.memo(function ChatMessage(items: {
    value: ChatMessageData;
}) {
    const { value: msg } = items;

    const { classes, cx } = useStyles();
    const { classes: messageClasses } = useMessageStyles();

    return (
        <div
            className={cx(classes.root, {
                [messageClasses.human]: msg.userId == UserId.HUMAN,
                [messageClasses.robot]: msg.userId == UserId.ROBOT,
            })}>
            <div>
                <span>[{padStart(userIdToString(msg.userId), 5, " ")}]: </span>
                {msg.message != undefined && <span>{msg.message}</span>}
            </div>
        </div>
    );
});