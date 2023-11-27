import React from 'react';
import styled from 'styled-components';

const UserData = ({ user }) => {
  const { name, surname, email, image, username, birthdate, age, province } = user;

  const User = styled.div`
    width: 400px;
    height: 250px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `;

  const Username = styled.h2`
    margin: 0;
    background-color: black;
    color: white;
    padding: 5px;
  `;

  const Image = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 10px;
    border: solid 2px;
  `;

  const Name = styled.h2`
    margin: 0;
  `;

  const Age = styled.h2`
    margin: 0;
    font-size: 10px;
    margin-left: 30px;
  `;

  const Birthdate = styled.h2`
    margin: 0;
    font-size: 10px;
  `;

  const Surname = styled.h2`
    margin: 0;
  `;

  const Email = styled.p`
    font-size: 14px;
    margin-top: 100px;
  `;

  const Province = styled.p`
    font-size: 14px;
    margin-left: 200px;
    margin-top: 100px;
  `;

  return (
    <User>
      <Username>{username}</Username>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Image src={image} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Name>{name}</Name>
          <Surname>{surname}</Surname>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Birthdate>{birthdate}</Birthdate>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Age>({age} años)</Age>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
            <Email>{email}</Email>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Province>{province}</Province>
            </div>
          </div>
    </User>
  );
};

export default UserData;
