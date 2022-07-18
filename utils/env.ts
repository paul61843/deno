export function getArgsPort(): number | null {
  const argsPort = Deno.args.find((item: string) => item.includes("--port="));
  const port = Number(argsPort?.replace("--port=", ""));
  return port ? port : null;
}
