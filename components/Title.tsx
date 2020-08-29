import styled from 'styled-components';

const StyledTitle = styled.h1`
  font-size: 3.2rem;
  line-height: 4rem;
  color: ${(p) => (p.color ? p.color : p.theme.color.gray600)};
`;

export function Title({
  color,
  children,
}: {
  color?: string;
  children: React.ReactNode;
}) {
  return <StyledTitle color={color}>{children}</StyledTitle>;
}
