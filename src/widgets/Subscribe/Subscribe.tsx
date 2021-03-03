import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import Button from "../../components/Button";

import {
  clearMessages,
  setSqls,
  setSubscribed,
  messagesSelector,
  sqlsSelector,
  subscribedSelector,
} from '../Main/mainSlice';
import {tokenSelector} from "../Login/loginSlice";


export default function Subscribe() {
  const dispatch = useDispatch();
  const sqls = useSelector(sqlsSelector);
  const messages = useSelector(messagesSelector);
  const subscribed = useSelector(subscribedSelector);
  const token = useSelector(tokenSelector);
  const btnStyle = classnames("button is-small is-info", { 'is-loading': subscribed });

  const onSqlsChange = useCallback((event: any) => dispatch(setSqls(event.target.value)), []);

  const handleSubscribeClick = useCallback(() => {
    dispatch(setSubscribed(true))
  }, []);

  const onClearMessages = () => dispatch(clearMessages());
  return (
    <nav className="ws-subscribe panel">
      <div className="panel-heading">
        <div className="field has-addons">
          <p className="control is-expanded">
              <textarea
                rows={3}
                className="textarea is-small is-info"
                placeholder="SQLS"
                value={sqls}
                onChange={onSqlsChange}
              />
          </p>
        </div>
      </div>
      <div className="panel-block">
        <div className="control">
          <Button
            style={{ marginRight: "10px" }}
            onClick={handleSubscribeClick}
            className={btnStyle}
            disabled={!sqls || !token}
          >
            Subscribe
          </Button>
          <Button
            onClick={onClearMessages}
            className="button is-small is-danger"
          >
            Clear Messages
          </Button>
        </div>
      </div>
      <div className="panel-block">
        <div className="control">Number of messages: {messages.length}</div>
      </div>
    </nav>
  );
}
