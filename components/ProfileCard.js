import { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default class ProfileCard extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      userData: user,
    };
  }

  render() {
    const { userData } = this.state;

    const trainerTeamImg = `/images/team/${userData.trainerTeam}.png`;

    return (
      <>
        <h3>Profile: {userData.userName}</h3>
        <p>id: {userData.id}</p>
        <br />
        {trainerTeamImg && (
          <img src={trainerTeamImg} alt="team" width="128" heigth="128" />
        )}
        <p>level: {userData.trainerLevel}</p>
        <p>trainer code: {userData.trainerCode}</p>
        <br />
        <p>telegram: {userData.telegram}</p>
        <br />

        <p>createdAt: {userData.createdAt}</p>
        <p>updatedAt: {userData.updatedAt}</p>
        <br />

        <p>
          coords: {userData.locLatitude} {userData.locLongtitude}
        </p>
        <br />
        <p>
          trade lists:
          {userData.tradeLists.map((list) => (
            <ul>
              <li>id: {list.id}</li>
              <li>
                pokemons:
                {list.pokemons.map((pokemon) => (
                  <li>{pokemon}</li>
                ))}
              </li>
              <li>description: {list.description}</li>
              <li>private: {list.isPrivate}</li>
            </ul>
          ))}
        </p>
        <br />
        <p>
          Followers:
          {userData.followers.map((follower) => (
            <ul>
              <li>id: {follower.id}</li>
              <li>
                user:
                {follower.user.userName}
              </li>
              <li>follower: {follower.follower.userName}</li>
            </ul>
          ))}
        </p>
        <br />
        <p>
          Following:
          {userData.following.map((following) => (
            <ul>
              <li>id: {following.id}</li>
              <li>
                user:
                {following.user.userName}
              </li>
              <li>follower: {following.follower.userName}</li>
            </ul>
          ))}
        </p>
        <br />
      </>
    );
  }
}

ProfileCard.propTypes = {
  user: PropTypes.arrayOf(PropTypes.object).isRequired,
};
