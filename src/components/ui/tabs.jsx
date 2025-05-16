import React, { useState } from "react";

export function Tabs({ children, defaultValue }) {
  const [active, setActive] = useState(defaultValue);
  return (
    <div>
      {React.Children.map(children, (child) =>
        child.type === TabsList
          ? React.cloneElement(child, { active, setActive })
          : child
      )}
      {React.Children.map(children, (child) =>
        child.type === TabsContent && child.props.value === active ? child : null
      )}
    </div>
  );
}

export function TabsList({ children, active, setActive }) {
  return (
    <div className="flex space-x-4 mb-4">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { active, setActive })
      )}
    </div>
  );
}

export function TabsTrigger({ value, active, setActive, children }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${
        active === value ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
      }`}
      onClick={() => setActive(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  return <div>{children}</div>;
}
