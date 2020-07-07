import styled from 'styled-components';
import PropTypes from 'prop-types';
import { pokeTypeName, pokeTypeColor } from '../lib/pokeTypes';
import { pokeTypeWeather, pokeTypeWeatherImg } from '../lib/pokeWeather';
import pokeCalcCp from '../lib/pokeCp';
import pokeCheckName from '../lib/pokeName';
import { pokeImg } from '../lib/pokeImg';

const Card = styled.div`
  color: #fff;
  font-size: 1.4rem;
  display: flex;
  padding: 0.5rem 1rem;
  align-items: center;
  border-radius: 10px;
  max-width: 40rem;
  background-image: linear-gradient(
    to right,
    ${(props) =>
      props.typeTwoColor
        ? `${props.typeOneColor}, ${props.typeTwoColor}`
        : `${props.typeOneColor}, ${props.typeOneColor}`}
  );
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const CardImg = styled.div`
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-image: url(${(props) => props.imgUrl});
  width: 7.5rem;
  height: 7.5rem;
  min-width: 7.5rem;
  margin-right: 1.5rem;
`;

const Shiny = styled.div`
  position: absolute;
  right: 0.2rem;
  top: 0.2rem;
  width: 2.6rem;
  height: 2.6rem;
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.3));

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    background-color: #fcd768;
    width: 1.3rem;
    height: 1.3rem;
    clip-path: polygon(
      50% 0%,
      65% 35%,
      100% 50%,
      65% 65%,
      50% 100%,
      35% 65%,
      0 50%,
      35% 35%
    );
  }

  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 0.5rem;
    background-color: #fcd768;
    width: 1.5rem;
    height: 1.5rem;
    clip-path: polygon(
      50% 0%,
      65% 35%,
      100% 50%,
      65% 65%,
      50% 100%,
      35% 65%,
      0 50%,
      35% 35%
    );
  }
`;

const RaidContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const RaidTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.3));
`;

const WeatherIcons = styled.div`
  font-size: 0;
  line-height: 0;
`;

const RaidType = styled.span`
  display: inline-block;
  padding: 0.1rem 0.7rem;
  margin-right: 0.3rem;
  margin-bottom: 0.3rem;
  color: #eee;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  background-color: ${(props) => props.typeColor};
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
`;

const RaidCpContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RaidCpOutput = styled.span`
  letter-spacing: 1px;
  font-variant-numeric: tabular-nums;
`;

const RaidCard = (props) => {
  const {
    id,
    name,
    type1,
    type2,
    shiny,
    baseStamina,
    baseAttack,
    baseDefense,
  } = props;

  // Filter name & get img
  const pokeName = pokeCheckName(name);
  const imgUrl = pokeImg(name, id);

  // Get type names
  const typeOneName = pokeTypeName(type1);
  const typeTwoName = pokeTypeName(type2);

  // Get type colors
  const typeOneColor = pokeTypeColor(type1);
  const typeTwoColor = pokeTypeColor(type2);

  // Get weather icons
  const weather = pokeTypeWeather(type1, type2);
  const weatherImg = pokeTypeWeatherImg(weather);

  // Calc CPs
  const cpLow = pokeCalcCp(baseAttack, baseStamina, baseDefense, 20, 10, 10, 10);
  const cpMax = pokeCalcCp(baseAttack, baseStamina, baseDefense, 20, 15, 15, 15);

  const cpLowBoost = pokeCalcCp(
    baseAttack,
    baseStamina,
    baseDefense,
    25,
    10,
    10,
    10
  );
  const cpMaxBoost = pokeCalcCp(
    baseAttack,
    baseStamina,
    baseDefense,
    25,
    15,
    15,
    15
  );

  return (
    <Card typeOneColor={typeOneColor} typeTwoColor={typeTwoColor}>
      <CardImg imgUrl={imgUrl}>{shiny && <Shiny />}</CardImg>

      <RaidContent>
        <RaidTitle>
          {/* Need to remove this split when FORMS library is done */}
          <div>{pokeName}</div>
          <WeatherIcons>
            {weatherImg.map((icon) => (
              <img
                src={icon}
                alt="Weather boost icon"
                width="22"
                height="22"
                key={icon}
              />
            ))}
          </WeatherIcons>
        </RaidTitle>
        <div>
          <RaidType typeColor={typeOneColor}>{typeOneName}</RaidType>
          {type2 && <RaidType typeColor={typeTwoColor}>{typeTwoName}</RaidType>}
        </div>
        <div>
          <RaidCpContainer>
            CP
            <RaidCpOutput>
              {cpLow} - {cpMax}
            </RaidCpOutput>
          </RaidCpContainer>
          <RaidCpContainer>
            🌥
            <RaidCpOutput>
              {cpLowBoost} - {cpMaxBoost}
            </RaidCpOutput>
          </RaidCpContainer>
        </div>
      </RaidContent>
    </Card>
  );
};

RaidCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type1: PropTypes.string.isRequired,
  type2: PropTypes.string,
  shiny: PropTypes.bool.isRequired,
  baseStamina: PropTypes.number.isRequired,
  baseAttack: PropTypes.number.isRequired,
  baseDefense: PropTypes.number.isRequired,
};

RaidCard.defaultProps = {
  type2: null,
};

export default RaidCard;
