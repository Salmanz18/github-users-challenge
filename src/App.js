import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

//Todo:
// [x] - Form submission

// [] - Error handling : If the specified username is invalid, an error message should be displayed.

// [] - Validation and ordering : Submit button should be grayed out/disabled by default. It should be enabled when the user enters some username. The repositories should be sorted by descending order of the size.

// [] - Filtering : By default, the app should exclude repositories that are forked (i.e. fork: true). If the user checks the box Include forks, then the forked repositories should also be included in the result.

function App() {
  const [repoList, setRepoList] = useState(null);
  const [username, setUsername] = useState('');

  const fetchRepos = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      const repos = response.data;
      console.log(repos);
      setRepoList(repos);
    } catch {
      throw new Error('User not Found');
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setUsername(e.target.value);
  };

  return (
    <div className="App">
      <div className="input">
        <label htmlFor="username">Github username: </label>
        <input id="username" type="text" onChange={handleChange} />
        <label htmlFor="fork">Include forks: </label>
        <input id="fork" type="checkbox" />
        <button onClick={fetchRepos}>Submit</button>
      </div>

      <div>
        <section>
          <header>
            <div className="col">Name</div>
            <div className="col">Language</div>
            <div className="col">Description</div>
            <div className="col">Size</div>
          </header>
        </section>
      </div>
      {repoList &&
        repoList.map((el) => {
          return (
            <section key={el.id}>
              <div className="col">{el.name}</div>
              <div className="col">{el.language}</div>
              <div className="col">{el.description}</div>
              <div className="col">{el.size}</div>
            </section>
          );
        })}
      <div className="error">Dummy error</div>
    </div>
  );
}

export default App;
