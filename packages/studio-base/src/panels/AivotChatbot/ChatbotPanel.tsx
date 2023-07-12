// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
import {useCallback, useEffect, useMemo, useState} from "react"
import Stack from "@foxglove/studio-base/components/Stack";
import {AivotChatbotConfig, ChatMessageData, UserId} from "@foxglove/studio-base/panels/AivotChatbot/types";
import {ChatMessagesList} from "@foxglove/studio-base/panels/AivotChatbot/ChatMessageList";
import {Button, Divider, inputBaseClasses, OutlinedInput, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import {fonts} from "@foxglove/studio-base/util/sharedStyleConstants";
import PanelToolbar from "@foxglove/studio-base/components/PanelToolbar";
import {SaveConfig} from "@foxglove/studio-base/types/panels";
import {useAivotChatbotSettings} from "@foxglove/studio-base/panels/AivotChatbot/settings";
import {useMessagePipeline} from "@foxglove/studio-base/components/MessagePipeline";
import {PlayerPresence} from "@foxglove/studio-base/players/types";
import {useMessagesByTopic} from "@foxglove/studio-base/PanelAPI";

type Props = {
    config: AivotChatbotConfig,
    saveConfig: SaveConfig<AivotChatbotConfig>
};

type String = {
    data: string
}

enum ChatbotState {
    DISCONNECTED        = 0,
    CONNECTED           = 1 << 0,
    REQUEST_IN_PROGRESS = 1 << 1,
    RESET_IN_PROGRESS   = 1 << 2,
}

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

const NotificationScreen = ({message} : { message: string } ) => {
    return (
        <Stack flex="auto" justifyContent="center" alignItems="center" gap={1} fullHeight>
            <Typography variant="inherit" gutterBottom>
                {message}
            </Typography>
        </Stack>
    );
}

export default function AivotChatbotPanel(props: Props): JSX.Element {
    const {config, saveConfig} = props;
    const { namespace } = config;
    const { classes } = useStyles();

    useAivotChatbotSettings(config, saveConfig);

    const mySuiteName = "RobotGpt";
    const mySkillName = "Insane";
    const myFeedbackTopic = `${namespace}/InsaneSkillFeedback`;

    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState<ChatMessageData[]>([]);
    const [chatbotState, setChatbotState] = useState<ChatbotState>(ChatbotState.DISCONNECTED);

    const addMessage = (user: UserId, message: string) => {
        setMessages(prevState => [ ... prevState, {userId: user, message: message}]);
    };

    const checkState = useCallback((state: ChatbotState) => {
        console.log(`checkState: chatbotState: ${chatbotState.toString(2)}, check: ${state.toString(2)}`);
        return (chatbotState & state) === state;
    }, [chatbotState]);

    const isPlayerPresent = useMessagePipeline((context) =>
            context.playerState.presence === PlayerPresence.PRESENT
    );



    const callService = useMessagePipeline((context) => context.callService);

    const invokeService = useCallback((service: string, request: unknown): Promise<unknown> => {
        try {
            setChatbotState(prevState => prevState | ChatbotState.REQUEST_IN_PROGRESS);
            return callService(service, request)
                .catch((reason) => {
                    console.error(`Call to Aivot failed with ${reason}`);
                    setChatbotState(ChatbotState.DISCONNECTED);
                })
                .finally(() => {
                    setChatbotState(prevState => prevState & ~ChatbotState.REQUEST_IN_PROGRESS);
            });
        } catch (err) {
            setChatbotState(ChatbotState.DISCONNECTED);
            return Promise.reject(err);
        }
    },[callService]);

    const feedbackEvents = useMessagesByTopic({
        topics: [myFeedbackTopic],
        historySize: 1,
    });

    useEffect(() => {
        const events = feedbackEvents?.[myFeedbackTopic];
        events?.forEach((event) => {
            addMessage(UserId.ROBOT, (event.message as String).data);
        });
    }, [feedbackEvents]);

    const onSendClicked = useCallback(() => {
        addMessage(UserId.HUMAN, prompt);
        setPrompt("");

        invokeService(namespace + "/ChatbotMessage", {
            suite: mySuiteName,
            skill: mySkillName,
            message: prompt,
            feedbackTopic: myFeedbackTopic,
            }
        )
        .then((resp) => {
            const record = resp as Record<string, unknown>;
            const status = record["status"] as number;
            if (status != 0) {
                throw new Error(`Adding instruction failed with code: ${status}`);
            }
        });

    }, [prompt, invokeService]);

    const onResetClicked = useCallback(() => {
        setMessages([]);
        setPrompt("");

        setChatbotState(prevState => prevState | ChatbotState.RESET_IN_PROGRESS);
        invokeService(namespace + "/SetupEnv", { envName: "Colored-Boxes"})
            .then((resp) => {
                if (resp != undefined) {
                    const record = resp as Record<string, unknown>;
                    const status = record["status"] as number;
                    addMessage(UserId.ROBOT, `Environment reset status code ${status} `);

                    return invokeService(namespace + "/CreateSkill", {suiteName: "RobotGpt", skillName: "Insane"});
                }
                return resp;
            })
            .finally(() => {
                setChatbotState(prevState => prevState & ~ChatbotState.RESET_IN_PROGRESS);
            });
    }, [invokeService]);

    useEffect(() => {
        setChatbotState(isPlayerPresent ? ChatbotState.CONNECTED : ChatbotState.DISCONNECTED);

        if (isPlayerPresent) {
            onResetClicked();
        }
    }, [isPlayerPresent]);

    const notificationMessage = useMemo(() => {
        if (!checkState(ChatbotState.CONNECTED)) {
            return "No connection to the backend services...";
        }
        if (checkState(ChatbotState.RESET_IN_PROGRESS)) {
            return "Setting up the environment...";
        }
        return "";
    }, [chatbotState]);

    const disableControls = useMemo(() => {
        return checkState(ChatbotState.REQUEST_IN_PROGRESS);
    }, [chatbotState]);

    return (
        <Stack fullHeight>
            <PanelToolbar/>
            <Divider/>

            <Stack flex="auto" padding={2} gap={1} paddingBottom={2} flexShrink={0}>
                <Stack flex="4 1 auto">
                    { notificationMessage != "" && <NotificationScreen message={notificationMessage}/> }
                    { notificationMessage === "" && <ChatMessagesList items={messages}/> }
                </Stack>
                <Stack flex="0 0 auto" alignItems="flex-end">
                    <OutlinedInput
                        className={classes.textarea}
                        multiline
                        placeholder="Enter your instructions here"
                        value={prompt}
                        disabled={disableControls}
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
                        disabled={(disableControls || prompt === "")}
                        onClick={onSendClicked}
                    >
                        Send
                    </Button>
                    <Button
                        variant="contained"
                        size="medium"
                        disabled={disableControls}
                        onClick={onResetClicked}
                    >
                        Reset
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}