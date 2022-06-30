import { React, ReactDOMServer } from "../../dep.ts";

export default (props) => {
  const { rows } = props;
  return (
    <tbody>
      {rows.map((row, rowIdx) => (
        <tr key={rowIdx}>
          {row.map((column, colIdx) => (
            <td key={colIdx}>{column}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
