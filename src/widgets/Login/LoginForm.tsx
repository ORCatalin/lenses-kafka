import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import Button from "../../components/Button";
import {
  setHost,
  setUser,
  setPassword,
  hostSelector,
  userSelector,
  passwordSelector,
  loadingStatusSelector,
  login,
  tokenSelector,
} from './loginSlice';
import { AsyncActionStatus } from "../../util/constants";

export default function Connect() {
  const dispatch = useDispatch();
  const host = useSelector(hostSelector);
  const user = useSelector(userSelector);
  const password = useSelector(passwordSelector);
  const loadingStatus = useSelector(loadingStatusSelector);
  const token = useSelector(tokenSelector);

  const btnStyle = classnames("button is-fullwidth", {
    "is-primary": true,
    "is-danger": false,
    "is-loading": loadingStatus === AsyncActionStatus.PENDING,
  });

  const onInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    switch (name) {
      case "host":
        dispatch(setHost(value));
        break;
      case "user":
        dispatch(setUser(value));
        break;
      case "password":
        dispatch(setPassword(value));
        break;
      default:
        break;
    }
  };

  const handleLogin = () => dispatch(login());
  return (
    <nav className="panel">
      <p className="panel-heading">Connection Details</p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            className="input is-small"
            type="text"
            placeholder="host"
            value={host}
            name="host"
            onChange={onInputChange}
          />
          <span className="icon is-small is-left">
              <i className="fa fa-server"/>
            </span>
        </p>
      </div>
      {token && (
        <div className="panel-block">
          <p className="control has-icons-left">
            You are logged in as {user}
          </p>
        </div>
      )}
      {!token && (
        <>
          <div>
            <div className="panel-block">
              <p className="control has-icons-left">
                <input
                  className="input is-small"
                  type="text"
                  placeholder="User"
                  value={user}
                  name="user"
                  onChange={onInputChange}
                />
                <span className="icon is-small is-left">
                <i className="fa fa-user"/>
              </span>
              </p>
            </div>
            <div className="panel-block">
              <p className="control has-icons-left">
                <input
                  className="input is-small"
                  type="password"
                  placeholder="Password for Authentication"
                  value={password}
                  name="password"
                  onChange={onInputChange}
                  autoComplete="off"
                />
                <span className="icon is-small is-left">
                <i className="fa fa-lock"/>
              </span>
              </p>
            </div>
          </div>
          <div className="panel-block">
            <Button onClick={handleLogin} className={btnStyle}>
              Login
            </Button>
          </div>
        </>
      )}
    </nav>
  );
}
