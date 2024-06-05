// /app/components/ComponentList.tsx
import React from 'react';

interface ComponentListProps {
  components: string[];
}

const ComponentList: React.FC<ComponentListProps> = ({ components }) => {
  return (
    <div>
      <h1>Liste des Composants</h1>
      <ul>
        {components.map((component, index) => (
          <li key={index}>{component}</li>
        ))}
      </ul>
    </div>
  );
};

export default ComponentList;
