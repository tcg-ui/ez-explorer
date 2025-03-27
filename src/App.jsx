import { useState } from "react";
import "./App.css";
import List from "./List";
import Monaco from "./Monaco";
import Properties from "./Properties";

function App() {
  const [screen, setScreen] = useState();
  const [activeId, setActiveId] = useState("");
  const [activeProperty, setActiveProperty] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsedData = JSON.parse(reader.result);
          const uuidKey = Object.keys(parsedData)[0];
          const value = parsedData[uuidKey];
          setScreen(value);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };
  const getWidgetProperties = (id) => {
    return screen._source.meta.widgets[id] ?? {};
  };
  if (!screen)
    return (
      <div className="file-input">
        <div>Select screen.json file</div>
        <input type="file" accept=".json" onChange={handleFileChange} />
      </div>
    );
  console.log({ screen });
  return (
    <div className="grid">
      <div className="list">
        <List activeId={activeId} setActiveId={setActiveId} screen={screen} />
      </div>
      <div className="list">
        <Properties
          activeId={activeId}
          activeProperty={activeProperty}
          setActiveProperty={setActiveProperty}
          getWidgetProperties={getWidgetProperties}
        />
      </div>
      <div className="monaco">
        <Monaco
          activeId={activeId}
          activeProperty={activeProperty}
          getWidgetProperties={getWidgetProperties}
        />
      </div>
    </div>
  );
}

export default App;
