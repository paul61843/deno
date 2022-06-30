import { React, ReactDOMServer } from "../../dep.ts";
import TableHead from "./TableHead.tsx";
import TableBody from "./TableBody.tsx";

export default (props) => {
  const { source } = props;

  return (
    <table>
      <TableHead columns={source?.tableHead}></TableHead>
      <TableBody rows={source?.tableBody}></TableBody>
    </table>
  );
};
