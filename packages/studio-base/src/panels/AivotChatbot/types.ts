// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

export type AivotChatbotConfig = {
    namespace: string
};

export enum UserId {
    HUMAN = 0,
    ROBOT = 1,
}

export type ChatMessageData = {
    userId: UserId;
    message: string;
};

export function userIdToString(userId: UserId): string {
    switch (userId) {
        case UserId.ROBOT:
            return "Robot";
        case UserId.HUMAN:
            return "You";
        default:
            return "?????";
    }
}
