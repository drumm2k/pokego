import styled from 'styled-components';
import PropTypes from 'prop-types';
import { pokeTypeName, pokeTypeColor } from '../lib/poke-types';
import { pokeTypeWeather, pokeTypeWeatherImg } from '../lib/poke-weather';
import calcCP from '../lib/poke-cp';

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
  margin-right: 2rem;
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
  line-height: 0.6;
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.3));
`;

const RaidType = styled.span`
  display: inline-block;
  padding: 0.1rem 0.7rem;
  margin-right: 0.3rem;
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
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;

const RaidCard = (props) => {
  const { id, name, type, type2, shiny, stats } = props;

  // Get type names
  const typeOne = pokeTypeName(type);
  const typeTwo = pokeTypeName(type2);

  // Get type colors
  const typeOneColor = pokeTypeColor(type);
  const typeTwoColor = pokeTypeColor(type2);

  // Get weather icons
  const typeWeather = pokeTypeWeather(type, type2);
  const typeWeatherImg = pokeTypeWeatherImg(typeWeather);

  // Calc CPs
  const cpLow = calcCP(
    stats.baseAttack,
    stats.baseStamina,
    stats.baseDefense,
    20,
    10,
    10,
    10
  );
  const cpMax = calcCP(
    stats.baseAttack,
    stats.baseStamina,
    stats.baseDefense,
    20,
    15,
    15,
    15
  );

  const cpLowBoost = calcCP(
    stats.baseAttack,
    stats.baseStamina,
    stats.baseDefense,
    25,
    10,
    10,
    10
  );
  const cpMaxBoost = calcCP(
    stats.baseAttack,
    stats.baseStamina,
    stats.baseDefense,
    25,
    15,
    15,
    15
  );

  return (
    <Card typeOneColor={typeOneColor} typeTwoColor={typeTwoColor}>
      <CardImg imgUrl={`/img/pokemon/${id}.png`}>{shiny && <Shiny />}</CardImg>

      <RaidContent>
        <RaidTitle>
          {/* Need to remove this split when FORMS library is done */}
          <div>{name.split('_')[0]}</div>
          <div>
            {typeWeatherImg.map((icon) => (
              <img src={icon} alt="weather" width="25" height="25" key={icon} />
            ))}
          </div>
        </RaidTitle>
        <div>
          <RaidType typeColor={typeOneColor}>{typeOne}</RaidType>
          {type2 && <RaidType typeColor={typeTwoColor}>{typeTwo}</RaidType>}
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
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  type2: PropTypes.string,
  shiny: PropTypes.bool.isRequired,
  stats: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
};

RaidCard.defaultProps = {
  type2: null,
};

export default RaidCard;
