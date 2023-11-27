import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserData from './UserData';

const Loading = styled.div`
  font-size: 24px;
  text-align: center;
  margin-top: 50px;
`;

const ErrorMsg = styled.div`
  font-size: 24px;
  text-align: center;
  margin-top: 50px;
  color: red;
`;

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(10); // Default quantity of users to fetch

  useEffect(() => {
    fetchUsers();
  }, [quantity]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://randomuser.me/api/?nat=es&results=${quantity}`);
      const data = await response.json();
      const processedUsers = data.results.map((user) => {
        const userWithoutImage = {
          name: user.name.first,
          surname: user.name.last,
          username: user.login.username,
          gender: user.gender,
          email: user.email,
        };
        userWithoutImage.image = getImageURL(user);
        return userWithoutImage;
      });
      setUsers(processedUsers);
      setLoading(false);
      setError(false); // Reset error state
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(true);
      setLoading(false);
    }
  };

  const getRandomInt = (max) => Math.floor(Math.random() * max);

  const getImageURL = (user) =>
    `https://randomuser.me/api/portraits/${
      user.gender === 'female' ? 'women' : 'men'
    }/${getRandomInt(100)}.jpg`;

  const handleReload = () => {
    setUsers([]);
    fetchUsers();
  };

  const handleSelectChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <select value={quantity} onChange={handleSelectChange} disabled={loading}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
        <button onClick={handleReload} disabled={loading}>
          Reload
        </button>
      </div>
      {loading && <Loading>Loading...</Loading>}
      {error && <ErrorMsg>Error loading data</ErrorMsg>}
      <GridLayout>
        {users.map((user, index) => (
          <UserData key={index} user={user} />
        ))}
      </GridLayout>
    </div>
  );
};

export default App;
