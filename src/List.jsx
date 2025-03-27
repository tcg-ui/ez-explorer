import { useState } from "react";
import clsx from "clsx";
function getColorFromWord(word) {
  let hash = 0;
  for (let i = 0; i < word.length; i++) {
    hash = word.charCodeAt(i) + ((hash << 5) - hash);
  }
  let r = (hash & 0xff0000) >> 16;
  let g = (hash & 0x00ff00) >> 8;
  let b = hash & 0x0000ff;

  const darkFactor = 0.8;
  r = Math.floor(r * darkFactor);
  g = Math.floor(g * darkFactor);
  b = Math.floor(b * darkFactor);

  const color = ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  return `#${color}`;
}

function List({ activeId, setActiveId, screen }) {
  const [query, setQuery] = useState("");
  const meta = screen._source.meta;
  const layout = meta.layout;
  const lowerCaseQuery = query.toLowerCase();
  const keys = Object.keys(layout).filter((widgetId) => {
    return (
      layout[widgetId].name.toLowerCase().includes(lowerCaseQuery) ||
      layout[widgetId].type.toLowerCase().includes(lowerCaseQuery)
    );
  });
  return (
    <>
      <input
        type="text"
        placeholder="Search widgets by name or type"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {keys.map((widgetId) => {
        const { name, type } = layout[widgetId];
        return (
          <div
            className={clsx("list-item", activeId === widgetId && "active")}
            key={widgetId}
            onClick={() => setActiveId(widgetId)}
          >
            <div
              className="widget-type"
              style={{ color: getColorFromWord(type) }}
            >
              {type}
            </div>
            {name}
          </div>
        );
      })}
    </>
  );
}

export default List;
