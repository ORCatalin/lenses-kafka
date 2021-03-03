import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getDeepObjectValue from 'lodash.get';

import LoginForm from '../Login/LoginForm';
import { messagesSelector, setMessages, sqlsSelector, subscribedSelector, setSubscribed } from './mainSlice';
import { tokenSelector, hostSelector } from '../Login/loginSlice';
import Subscribe from '../Subscribe/Subscribe';
import MessageList from '../MessageList/MessageList';
import Tabs from '../../components/Tabs';
import Chart from "../Chart/Chart";

enum TabsTypes {
  List,
  Chart,
}

const TABS = ['List', 'Chart'];
export default function Main() {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const messages = useSelector(messagesSelector)
  const messagesRef = useRef([]);
  const ws = useRef(null);
  const sqls = useSelector(sqlsSelector);
  const subscribed = useSelector(subscribedSelector);
  const host = useSelector(hostSelector);
  const [tab, setTab] = useState(TabsTypes.List);

  useEffect(() => {
    if (subscribed && token) {
      ws.current = new WebSocket(`ws://${host}:3030/api/ws/v2/sql/execute`);
      ws.current.onopen = (event: MessageEvent) => {
        console.log('open');
        ws.current.send(JSON.stringify({
          token,
          "stats": 2,
          "sql": sqls,
          "live": false
        }));
      };
      ws.current.onerror = (event: MessageEvent) => {
        console.log('error');
        dispatch(setSubscribed());
      };
      ws.current.onmessage = (event: MessageEvent) => {
        try {
          const parsedData = JSON.parse(event.data);
          messagesRef.current.push(parsedData.data);
          if (messagesRef.current.length === 1000) {
            ws.current.close();
            ws.current = null;
            dispatch(setSubscribed());
            let [_, ...messages] = messagesRef.current;
            messagesRef.current = [];
            let valueKeys = Object.keys(getDeepObjectValue(messages, '[0].value'));
            let messageKey = getDeepObjectValue(messages, '[0].key');
            if (typeof messageKey === 'object') {
              const keyKeys = Object.keys(messageKey);
              messageKey = keyKeys.length > 0 ? keyKeys[0] : undefined;
            }
            dispatch(setMessages({
              messages: messages.map((message, idx) => ({
                id: idx,
                ...valueKeys.reduce((acc: any, key: string) => {
                  const value = getDeepObjectValue(message, `value[${key}]`, '');
                  acc[key] = value && value.toString ? value.toString() : value;
                  return acc;
                }, {}),
                ...(typeof messageKey === 'object' ? messageKey : { key: messageKey }),
              })),
              setMemMessages: true,
            }));
          }
        } catch (e) {
          messagesRef.current = [];
          console.error('ws JSON parse error');
          dispatch(setSubscribed());
        }
      };
    }
    return () => {
      if (ws.current) {
        ws.current.close();
        ws.current = null;
        messagesRef.current = [];
        dispatch(setSubscribed());
      }
    };
  }, [token, subscribed]);

  const handleTabClick = (idx: number) => setTab(idx);
  console.log(tab)

  return (
    <div className="container app">
      <div className="columns">
        <div className="column">
          <LoginForm/>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Subscribe/>
          <Tabs tabs={TABS} activeTab={tab} onTabClick={handleTabClick}/>
          {messages.length > 0 && tab === TabsTypes.List && (
            <MessageList/>
          )}
          { tab === TabsTypes.Chart && (
            <Chart/>
          )}
        </div>
      </div>
    </div>
  );
}
