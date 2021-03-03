import React, { memo, useCallback } from 'react';
import classnames from 'classnames';

export interface ITabs {
  tabs: string[];
  onTabClick: (idx: number) => void;
  activeTab: number;
}

const DATA_ATTRIBUTE = 'data-idx';
export default memo(function Tabs({ tabs, onTabClick, activeTab }: ITabs) {
  const handleTabClick = useCallback((event: any) => {
    let idx = event.target.getAttribute(DATA_ATTRIBUTE);
    if (idx === null) {
      idx = event.target.parentElement.getAttribute(DATA_ATTRIBUTE);
    }
    onTabClick(typeof idx === 'string' ? parseInt(idx, 10) : 0);
  }, []);
  return (
    <div className="tabs is-centered">
      <ul onClick={handleTabClick}>
        {tabs.map((tab, idx) => {
          const liClassName = classnames('', { 'is-active': idx === activeTab });
          return (
            <li key={idx} data-idx={idx} className={liClassName}>
              <a className="has-text-primary-light">{tab}</a>
            </li>
          );
        })}
      </ul>
    </div>
  )
});