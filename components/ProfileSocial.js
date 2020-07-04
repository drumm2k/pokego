import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SocialContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 0.5rem;
`;

const ProfileSocial = ({ telegram }) => {
  if (!telegram) return null;
  const telegramLink = `https://t.me/${telegram}`;
  return (
    <SocialContainer>
      <IconContainer>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="24px"
          height="24px"
        >
          <linearGradient
            id="BiF7D16UlC0RZ_VqXJHnXa"
            x1="9.858"
            x2="38.142"
            y1="9.858"
            y2="38.142"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#33bef0" />
            <stop offset="1" stopColor="#0a85d9" />
          </linearGradient>
          <path
            fill="url(#BiF7D16UlC0RZ_VqXJHnXa)"
            d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
          />
          <path
            d="M10.119,23.466c8.155-3.695,17.733-7.704,19.208-8.284c3.252-1.279,4.67,0.028,4.448,2.113	c-0.273,2.555-1.567,9.99-2.363,15.317c-0.466,3.117-2.154,4.072-4.059,2.863c-1.445-0.917-6.413-4.17-7.72-5.282	c-0.891-0.758-1.512-1.608-0.88-2.474c0.185-0.253,0.658-0.763,0.921-1.017c1.319-1.278,1.141-1.553-0.454-0.412	c-0.19,0.136-1.292,0.935-1.745,1.237c-1.11,0.74-2.131,0.78-3.862,0.192c-1.416-0.481-2.776-0.852-3.634-1.223	C8.794,25.983,8.34,24.272,10.119,23.466z"
            opacity=".05"
          />
          <path
            d="M10.836,23.591c7.572-3.385,16.884-7.264,18.246-7.813c3.264-1.318,4.465-0.536,4.114,2.011	c-0.326,2.358-1.483,9.654-2.294,14.545c-0.478,2.879-1.874,3.513-3.692,2.337c-1.139-0.734-5.723-3.754-6.835-4.633	c-0.86-0.679-1.751-1.463-0.71-2.598c0.348-0.379,2.27-2.234,3.707-3.614c0.833-0.801,0.536-1.196-0.469-0.508	c-1.843,1.263-4.858,3.262-5.396,3.625c-1.025,0.69-1.988,0.856-3.664,0.329c-1.321-0.416-2.597-0.819-3.262-1.078	C9.095,25.618,9.075,24.378,10.836,23.591z"
            opacity=".07"
          />
          <path
            fill="#fff"
            d="M11.553,23.717c6.99-3.075,16.035-6.824,17.284-7.343c3.275-1.358,4.28-1.098,3.779,1.91	c-0.36,2.162-1.398,9.319-2.226,13.774c-0.491,2.642-1.593,2.955-3.325,1.812c-0.833-0.55-5.038-3.331-5.951-3.984	c-0.833-0.595-1.982-1.311-0.541-2.721c0.513-0.502,3.874-3.712,6.493-6.21c0.343-0.328-0.088-0.867-0.484-0.604	c-3.53,2.341-8.424,5.59-9.047,6.013c-0.941,0.639-1.845,0.932-3.467,0.466c-1.226-0.352-2.423-0.772-2.889-0.932	C9.384,25.282,9.81,24.484,11.553,23.717z"
          />
        </svg>
      </IconContainer>
      <a href={telegramLink} target="_blank" rel="noopener noreferrer">
        {telegram}
      </a>
    </SocialContainer>
  );
};

ProfileSocial.propTypes = {
  telegram: PropTypes.string,
};

ProfileSocial.defaultProps = {
  telegram: null,
};

export default ProfileSocial;
