import React from 'react';
import { PersonForm } from './components/PersonForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="min-h-screen bg-gray-50 py-8">
        <PersonForm />
      </div>
    </div>
  );
}

export default App;