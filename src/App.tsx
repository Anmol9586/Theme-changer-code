import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const storedConfig = localStorage.getItem('websiteConfig');
        if (storedConfig) {
          setConfig(JSON.parse(storedConfig));
        } else {
          const response = await axios.get('https://dummyjson.com/products');
          const fetchedConfig = response.data;
          localStorage.setItem('websiteConfig', JSON.stringify(fetchedConfig));
          setConfig(fetchedConfig);
          console.log(fetchedConfig,"config");

          
        }
      } catch (error) {
        console.error('Error fetching website config:', error);
      }
    };
    console.log('LocalStorage after setting config:', localStorage);

    fetchConfig();
  }, []);



 useEffect(() => {
    const hostname = window.location.hostname;
    let theme;

    if (hostname === 'abc.com') {
      theme = 'themeA';
    } else if (hostname === 'xyz.com') {
      theme = 'themeB';
    }

    if (theme) {
      import(`./theme/${theme}.css`)
        .then((module) => {
          console.log(`${theme} loaded`);
        })
        .catch((err) => {
          console.error(`Failed to load ${theme}:`, err);
        });
    }
  }, []);

  if (!config) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Themed App</h1>
        <p>The theme changes based on the domain name.</p>
      </header>
    </div>
  );
}

export default App;
