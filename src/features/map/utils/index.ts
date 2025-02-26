export const parseCoordString = (coordStr: string) => {
  return Number(parseFloat(coordStr).toFixed(6));
};
