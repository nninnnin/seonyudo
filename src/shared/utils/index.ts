export const replaceNewlineAsBreak = (str: string) => {
  return str.replaceAll("\n", "<br/>") ?? "";
};
