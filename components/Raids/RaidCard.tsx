import { pokeCalcCp } from 'lib/pokeCp';
import { pokeTypeWeather, pokeTypeWeatherImg } from 'lib/pokeWeather';
import styled from 'styled-components';
import { pokeImg } from '../../lib/pokeImg';
import pokeCheckName from '../../lib/pokeName';
import { pokeTypeColor, pokeTypeName } from '../../lib/pokeTypes';

interface RaidCardProps {
  id: number;
  name: string;
  type1: string;
  type2: string;
  shiny: boolean;
  baseStamina: number;
  baseAttack: number;
  baseDefense: number;
}

export function RaidCard({
  id,
  name,
  type1,
  type2,
  shiny,
  baseStamina,
  baseAttack,
  baseDefense,
}: RaidCardProps) {
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
            {weatherImg &&
              weatherImg.map((icon) => (
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
}

const Card = styled.div<{
  typeOneColor?: string;
  typeTwoColor?: string;
}>`
  color: ${(p) => p.theme.color.white};
  font-size: ${(p) => p.theme.font.size.xs};
  display: flex;
  padding: ${(p) => p.theme.spacing.s2} ${(p) => p.theme.spacing.s4};
  align-items: center;
  border-radius: ${(p) => p.theme.border.radius300};
  width: 100%;
  background-image: linear-gradient(
    to right,
    ${(props) =>
      props.typeTwoColor
        ? `${props.typeOneColor}, ${props.typeTwoColor}`
        : `${props.typeOneColor}, ${props.typeOneColor}`}
  );
  box-shadow: ${(p) => p.theme.lighting.shadow200};
`;

const CardImg = styled.div<{ imgUrl: string }>`
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-image: url(${(props) => props.imgUrl});
  width: 7.5rem;
  height: 7.5rem;
  min-width: 7.5rem;
  margin-right: ${(p) => p.theme.spacing.s6};
`;

const Shiny = styled.div`
  position: absolute;
  right: ${(p) => p.theme.spacing.s1};
  top: ${(p) => p.theme.spacing.s1};
  width: 2.6rem;
  height: 2.6rem;
  filter: drop-shadow(${(p) => p.theme.lighting.hard});

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
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.bold};
  display: flex;
  align-items: center;
  justify-content: space-between;
  filter: drop-shadow(${(p) => p.theme.lighting.hard});
`;

const WeatherIcons = styled.div`
  font-size: 0;
  line-height: 0;
`;

const RaidType = styled.span<{ typeColor?: string | undefined }>`
  display: inline-block;
  padding: 0.1rem ${(p) => p.theme.spacing.s3};
  margin-right: ${(p) => p.theme.spacing.s1};
  margin-bottom: ${(p) => p.theme.spacing.s1};
  color: ${(p) => p.theme.color.gray50};
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.bold};
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  background-color: ${(p) => p.typeColor};
  box-shadow: ${(p) => p.theme.lighting.light};
  border-radius: ${(p) => p.theme.border.radius400};
`;

const RaidCpContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RaidCpOutput = styled.span`
  letter-spacing: 1px;
  font-variant-numeric: tabular-nums;
`;
