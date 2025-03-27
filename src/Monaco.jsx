import { Editor } from "@monaco-editor/react";
import { SafeStringify, isJson } from "./Utils";

function Monaco({ activeId, activeProperty, getWidgetProperties }) {
  const property = getWidgetProperties(activeId)[activeProperty];
  const code = SafeStringify(property);

  return (
    <Editor
      value={code}
      language={isJson(property) ? "json" : "javascript"}
      options={{ minimap: { enabled: false } }}
    />
  );
}

export default Monaco;
