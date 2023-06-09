// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { VariableSizeList as List } from "react-window";
import { ChatMessageData } from "./types";
import {CSSProperties, useCallback, useEffect, useMemo, useRef} from "react";
import {useResizeDetector} from "react-resize-detector";
import ChatMessage from "@foxglove/studio-base/panels/AivotChatbot/ChatMessage";
import {AutoSizer} from "react-virtualized";
import 'react-virtualized/styles.css';

type Props = {
  items: readonly ChatMessageData[];
};

type ListItemData = {
    items: readonly ChatMessageData[];
    setRowHeight: (index: number, height: number) => void;
};

function ChatMessageRow(props: { data: ListItemData; index: number; style: CSSProperties }): JSX.Element {
  // const { timeFormat, timeZone } = useAppTimeFormat();
  const ref = useRef<HTMLDivElement>(ReactNull);

  useEffect(() => {
    if (ref.current) {
      props.data.setRowHeight(props.index, ref.current.clientHeight);
    }
  }, [props.data, props.index]);

  const item = props.data.items[props.index]!;

  return (
    <div style={{ ...props.style, height: "auto" }} ref={ref}>
      <ChatMessage value={item} />
    </div>
  );
}

export function ChatMessagesList({ items }: Props): JSX.Element {
    // Reference to the list item itself.
    const listRef = useRef<List>(ReactNull);

    // Reference to the outer list div. Needed for autoscroll determination.
    const outerRef = useRef<HTMLDivElement>(ReactNull);

    // Cache calculated item heights.
    const itemHeightCache = useRef<Record<number, number>>({});

    const getRowHeight = useCallback((index: number) => itemHeightCache.current[index] ?? 16, []);

    const setRowHeight = useCallback((index: number, height: number) => {
        itemHeightCache.current[index] = height;
        listRef.current?.resetAfterIndex(index);
    }, []);

    const { width: resizedWidth, ref: resizeRootRef } = useResizeDetector({
        refreshRate: 0,
        refreshMode: "debounce",
    });

    // This is passed to each row to tell it what to render.
    const itemData = useMemo(
        () => ({
            items,
            setRowHeight,
        }),
        // Add resized width as an extra dep here to force the list to recalculate
        // everything when the width changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [items, setRowHeight, resizedWidth],
    );

    return (
        <AutoSizer>
            {({ width, height }) => {
                return (
                    <div style={{position: "relative", width, height}} ref={resizeRootRef}>
                        <List
                            ref={listRef}
                            width={width}
                            height={height}
                            // style={{ outline: "none" }}
                            itemData={itemData}
                            itemSize={getRowHeight}
                            itemCount={items.length}
                            outerRef={outerRef}
                        >
                            { ChatMessageRow }
                        </List>
                    </div>
                );
            }}
        </AutoSizer>
    );
}
