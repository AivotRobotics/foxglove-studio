// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
import {useCallback, useEffect, useState} from "react"
import Stack from "@foxglove/studio-base/components/Stack";
import {AivotChatbotConfig, ChatMessageData, UserId} from "@foxglove/studio-base/panels/AivotChatbot/types";
import {ChatMessagesList} from "@foxglove/studio-base/panels/AivotChatbot/ChatMessageList";
import {Button, Divider, inputBaseClasses, OutlinedInput} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import {fonts} from "@foxglove/studio-base/util/sharedStyleConstants";
import PanelToolbar from "@foxglove/studio-base/components/PanelToolbar";
import {SaveConfig} from "@foxglove/studio-base/types/panels";
import {useAivotChatbotSettings} from "@foxglove/studio-base/panels/AivotChatbot/settings";
import {useMessagePipeline} from "@foxglove/studio-base/components/MessagePipeline";
import {PlayerCapabilities} from "@foxglove/studio-base/players/types";

type Props = {
    config: AivotChatbotConfig,
    saveConfig: SaveConfig<AivotChatbotConfig>
};

const useStyles = makeStyles()((theme) => {
    return {
        textarea: {
            width: "100%",
            height: "100%",
            textAlign: "left",
            backgroundColor: theme.palette.background.paper,
            overflow: "hidden",
            padding: theme.spacing(1, 0.5),

            [`.${inputBaseClasses.input}`]: {
                height: "100% !important",
                font: "inherit",
                lineHeight: 1.4,
                fontFamily: fonts.MONOSPACE,
                fontSize: "100%",
                overflow: "auto !important",
                resize: "none",
            },
        },
    };
});

export default function AivotChatbotPanel(props: Props): JSX.Element {
    const {config, saveConfig} = props;
    const { namespace } = config;
    const { classes } = useStyles();

    useAivotChatbotSettings(config, saveConfig);

    const mySuiteName = "RobotGpt";
    const mySkillName = "Insane";

    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState<ChatMessageData[]>([]);
    const [isInProgress, setInProgress] = useState(false);

    const addMessage = (user: UserId, message: string) => {
        setMessages(prevState => [ ... prevState, {userId: user, message: message}]);
    };

    const canCallServices = useMessagePipeline((context) =>
        context.playerState.capabilities.includes(PlayerCapabilities.callServices),
    );
    const callService = useMessagePipeline((context) => context.callService);

    const onSendClicked = useCallback(() => {
        addMessage(UserId.HUMAN, prompt);
        setPrompt("");

        setInProgress(true);
        callService(namespace + "/AddInstruction", {
            suiteName: mySuiteName,
            skillName: mySkillName,
            instructionText: prompt}
        )
            .then((resp) => {
                const record = resp as Record<string, unknown>;
                const status = record["status"] as number;
                if (status != 0) {
                    throw new Error(`Adding instruction failed with code: ${status}`);
                }
            })
            .catch((reason) => {
                addMessage(UserId.ROBOT, reason);
            })
            .finally(() => {
                setInProgress(false);
            });

    }, [prompt]);

    const onResetClicked = useCallback(() => {
        setMessages([]);
        setPrompt("");

        setInProgress(true);
        callService(namespace + "/SetupEnv", { envName: "Colored-Boxes"})
            .then((resp) => {
                const record = resp as Record<string, unknown>;
                const status = record["status"] as number;
                addMessage(UserId.ROBOT, `Environment reset status code ${status} `);

                return callService(namespace + "/CreateSkill", { suiteName: "RobotGpt", skillName: "Insane" });
            })
            .catch((reason) => {
                addMessage(UserId.ROBOT, reason);
            })
            .finally(() => {
                setInProgress(false);
            });

    }, []);

    useEffect(() => {
        if (canCallServices) {
            onResetClicked();
        }
    }, [canCallServices]);

    return (
        <Stack fullHeight>
            <PanelToolbar/>
            <Divider/>
            <Stack flex="auto" padding={2} gap={1} paddingBottom={2} flexShrink={0}>
                <Stack flex="4 1 auto">
                    <ChatMessagesList items={messages} />
                </Stack>
                <Stack flex="0 0 auto" alignItems="flex-end">
                    <OutlinedInput
                        className={classes.textarea}
                        multiline
                        placeholder="Enter your instructions here"
                        value={prompt}
                        disabled={!canCallServices || isInProgress}
                        onChange={(event) => setPrompt(event.target.value)}
                        rows={8}
                        maxRows={8}
                    />
                </Stack>
                <Stack flex="0 0 auto" alignItems="flex-start" direction="row"
                       justifyContent="flex-end" gap={1}>
                    <Button
                        variant="contained"
                        size="medium"
                        disabled={!canCallServices || (isInProgress || prompt === "")}
                        onClick={onSendClicked}
                    >
                        Send
                    </Button>
                    <Button
                        variant="contained"
                        size="medium"
                        disabled={!canCallServices || isInProgress}
                        onClick={onResetClicked}
                    >
                        Reset
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}