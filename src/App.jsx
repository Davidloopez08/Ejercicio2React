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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?nat=es&results=10');
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
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getRandomInt = (max) => Math.floor(Math.random() * max);

  const getImageURL = (user) =>
    `https://randomuser.me/api/portraits/${
      user.gender === 'female' ? 'women' : 'men'
    }/${getRandomInt(100)}.jpg`;

  if (loading) {
    return <Loading>Loading...</Loading>;
  }

  if (error) {
    return <ErrorMsg>Error loading data</ErrorMsg>;
  }

  return (
    <GridLayout>
      {users.map((user, index) => (
        <UserData key={index} user={user} />
      ))}
    </GridLayout>
  );
};

export default App;
