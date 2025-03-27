import clsx from "clsx";
import { useState } from "react";
function Properties({
  activeId,
  activeProperty,
  setActiveProperty,
  getWidgetProperties,
}) {
  const [query, setQuery] = useState("");
  const properties = getWidgetProperties(activeId);
  const lowerCaseQuery = query.toLowerCase();
  const keys = Object.keys(properties).filter((key) => {
    return key.toLowerCase().includes(lowerCaseQuery);
  });
  return (
    <>
      <input
        type="text"
        placeholder="Search properties"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {keys.map((key) => {
        return (
          <div
            className={clsx("list-item", activeProperty === key && "active")}
            key={key}
            onClick={() => setActiveProperty(key)}
          >
            {key}
          </div>
        );
      })}
    </>
  );
}

export default Properties;
