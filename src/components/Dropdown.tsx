import React, { useState, useCallback } from 'react';
import getDeepObjectValue from 'lodash.get';
import classNames from "classnames";

export interface IOption {
  label: string;
  value: string;
}

export interface IDropdown {
  title: string;
  options: IOption[];
  onChange: (value: IOption) => void;
  value: IOption;
}

export default function Dropdown({ title, options, onChange, value }: IDropdown) {
  const [active, setActive] = useState(false);
  const className = classNames('dropdown', { 'is-active': active });
  const handleDDLClick = useCallback(() => setActive(active => !active), []);
  const handleChange = useCallback((event) => {
    const target = event.target;
    const label = target.getAttribute('data-label');
    const value = target.getAttribute('data-value');
    onChange({ label, value });
    setActive(false);
  }, [])

  return (
    <div className={className}>
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDDLClick}
        >
          <span>{getDeepObjectValue(value, 'label') ? value.label : title}</span>
          <span className="icon is-small">
        <i className="fas fa-angle-down" aria-hidden="true"/>
      </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content" style={{ overflowY: 'auto', maxHeight: 200 }}>
          {options.map((option, idx) => {
            const className = classNames(
              'dropdown-item',
              { 'is-active': option.value === value.value },
            );
            return (
              <div
                data-value={option.value}
                data-label={option.label}
                className={className}
                key={option.value}
                onClick={handleChange}
              >
                {option.label}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}