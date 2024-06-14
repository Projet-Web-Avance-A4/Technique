import React from 'react';
import { ComponentListProps } from '@/app/interfaces/card';

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
