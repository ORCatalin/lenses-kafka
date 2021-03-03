import React from "react";

export interface IListItemDetailsRow {
  label: string;
  value: string;
}

const ListItemDetailsRow = ({ label, value }: IListItemDetailsRow): JSX.Element => (
  <li>
    <strong>{label}</strong>: {value}
  </li>
);

export default function ListItemDetails({ message }: { message: any }): JSX.Element {
  let arr: any[] = [];

  const { value } = message;
  if (value) {
    arr = Object.keys(JSON.parse(value)).map((k) => ({ label: k, value: JSON.parse(value)[k] }));
  }

  return (
    <div>
      {arr.length > 0 && (
        <div className="notification content list-item-details">
          <ul>
            {arr.map((item) => (
              <ListItemDetailsRow
                key={item.label}
                label={item.label}
                value={item.value ? String(item.value) : item.value}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}