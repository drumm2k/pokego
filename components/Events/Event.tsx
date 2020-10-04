import styled from 'styled-components';
import ChevronRightIcon from '../../assets/chevron_right.svg';
import { EventTimer } from './EventTimer';

interface EventProps {
  img: string;
  name: string;
  description: string;
  starts: string;
  ends: string;
}

export function Event({ img, name, description, starts, ends }: EventProps) {
  return (
    <EventCard>
      <EventImg imgUrl={img} alt={name} />
      <EventData>
        <div>
          <EventTitle>{name}</EventTitle>
          <EventDesc>{description}</EventDesc>
        </div>
        <EventTimer starts={starts} ends={ends} />
      </EventData>
      <EventArrow>
        <ChevronRightIcon />
      </EventArrow>
    </EventCard>
  );
}

const EventCard = styled.div`
  display: flex;
  max-width: 100%;
  margin-bottom: ${(p) => p.theme.spacing.s4};
  border-radius: ${(p) => p.theme.border.radius300};
  box-shadow: ${(p) => p.theme.lighting.shadow100};
  border: ${(p) => p.theme.border.border300};
  overflow: hidden;
  outline: none;
  transition: box-shadow 0.25s;

  &:hover {
    cursor: pointer;
    box-shadow: ${(p) => p.theme.lighting.shadow300};
  }

  &:focus {
    box-shadow: ${(p) => p.theme.input.focus};
  }
`;

const EventData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${(p) => p.theme.spacing.s4};
`;

const EventTitle = styled.h3`
  color: ${(p) => p.theme.color.black};
`;

const EventDesc = styled.p`
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.gray600};
  padding-bottom: ${(p) => p.theme.spacing.s2};
`;

const EventImg = styled.div<{ imgUrl: string; alt: string }>`
  background: url(${(p) => p.imgUrl}) 50% 50% no-repeat;
  background-size: cover;
  min-width: 12rem;
  min-height: 10rem;

  @media screen and (min-width: 768px) {
    min-width: 24rem;
    min-height: 12rem;
  }
`;

const EventArrow = styled.div`
  align-self: center;
  margin-left: auto;
  margin-right: ${(p) => p.theme.spacing.s2};
  height: 2.4rem;
  width: 2.4rem;
`;
