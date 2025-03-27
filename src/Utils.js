export const SafeStringify = (v) => {
  if (typeof v === "string" || typeof v === "number" || typeof v === "boolean")
    return v.toString();
  if (v === null || v === undefined) return "";
  return JSON.stringify(v, null, 2);
};

export const isJson = (v) => {
  return typeof v === "object";
};
