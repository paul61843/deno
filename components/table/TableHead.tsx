import { React, ReactDOMServer } from "../../dep.ts";

type Column = { title: string };

type Props = { columns: Column[] };

export default (props: Props) => {
  const { columns } = props;

  return (
    <thead>
      {columns.map((column: Column, index) => (
        <th key={index}>{column}</th>
      ))}
    </thead>
  );
};
