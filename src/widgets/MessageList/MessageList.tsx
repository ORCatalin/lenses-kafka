import React, { useCallback, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, AutoSizer } from "react-virtualized";
import classnames from 'classnames';
import MiniSearch from "minisearch";
import getDeepObjectValue from 'lodash.get';

import ListItemDetails from "./ListItemDetails";
import { setMessages, messagesSelector, clearSearch } from '../Main/mainSlice';

interface IRowEvent {
  key: any;
  index: number;
  isScrolling: boolean;
  isVisible: boolean;
  style: any;
}

interface IMessageListItem {
  label: string;
  value: string;
  className?: string;
}

function MessageListItem({ label, value, className }: IMessageListItem) {
  const style = classnames('column is-2', className);
  return (
    <div className={style}>
      <div>{label}</div>
      {value}
    </div>
  );
}

export default function MessageList() {
  const dispatch = useDispatch();
  const list = useRef(null);
  const miniSearch = useRef(null);
  const [message, setMessage] = useState({ value: undefined });
  const [searchValue, setSearchValue] = useState('');
  const messages = useSelector(messagesSelector);

  useEffect(() => {
    const messageValue = getDeepObjectValue(messages, '[1]');
    if (messageValue) {
      const keys = Object.keys(messageValue);
      miniSearch.current = new MiniSearch({
        fields: keys,
      });
      miniSearch.current.addAll(messages);
    }
  }, [messages]);

  const onShowRowDetails = (event: MouseEvent<HTMLDivElement, MouseEvent>) => {
    const message = event.target.getAttribute('data-message');
    console.log(message);
  }
  const onCommitMessage = () => {
  };
  const handleSearchClick = useCallback(() => {
    const searchedItems = miniSearch.current.search(searchValue);
    const mem = searchedItems.reduce((acc: any, foundItem: any) => {
      acc[foundItem.id] = true;
      return acc;
    }, {});
    dispatch(setMessages({
      messages: messages.filter((message: any) => mem[message.id])
    }));
  }, [searchValue]);

  const handleSearchChange = useCallback((event) => {
    const value = event.target.value;
    setSearchValue(value);
    if (!value) {
      dispatch(clearSearch());
    }
  }, []);

  const rowRenderer = (messages: any[]) => {
    return ({ key, index, isScrolling, isVisible, style }: IRowEvent) => {
      const message = messages[index];
      let arr: any[] = Object.keys(message).map((k) =>
        ({ label: k, value: message[k] }));

      return (
        <div
          key={key}
          style={style}
          className="message-row columns ws-message-list is-multiline"
          data-message={messages[index]}
          onClick={onShowRowDetails}
        >
          <div className="column is-2">
            <div>Index</div>
            {index}
          </div>

          {arr.map(item => (
            <MessageListItem
              key={item.label}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>
      );
    };
  };

  return (
    <div>
      <ListItemDetails
        message={message}
        onCommitMessage={onCommitMessage}
        onShowRowDetails={onShowRowDetails}
      />
      <nav className="panel mt-5">
        <div className="level">
          <div className="level-item level-right pt-2 pr-2">
            <div className="field has-addons">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Find a an item"
                  onChange={handleSearchChange}
                />
              </p>
              <p className="control">
                <button className="button" onClick={handleSearchClick}>
                  Search
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="panel-block">
          {messages.length > 0 && (
            <AutoSizer className="autosizer-bulma-fix">
              {({ height, width, disableHeight = true }) => (
                <List
                  ref={(listRef: any) => {
                    list.current = listRef;
                  }}
                  width={width}
                  height={290}
                  rowCount={messages.length}
                  rowHeight={160}
                  rowRenderer={rowRenderer(messages)}
                />
              )}
            </AutoSizer>
          )}
        </div>
      </nav>
    </div>
  )
}
