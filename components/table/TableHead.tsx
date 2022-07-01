import { React, ReactDOMServer } from "../../dep.ts";
import type { HeaderColumn, HeaderProps } from './type.d.ts';

export default (props: HeaderProps) => {
  const { columns } = props;

  return (
    <thead>
      {columns.map((column: HeaderColumn, index) => (
        <th key={index}>{column}</th>
      ))}
    </thead>
  );
};
