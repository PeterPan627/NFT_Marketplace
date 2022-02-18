import styled from 'styled-components';

export const StatsFilterItem = styled.div`
  margin-bottom: 2rem;
  padding: 10px 0;
`

export const StatsFilterItemName = styled.div<{ image: string }>`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  &>div {
    --image-size: 30px;
    background: ${({ image }) => `url(${image})`};
    background-size: var(--image-size) var(--image-size);
    width: var(--image-size);
    height: var(--image-size);
    margin-right: 5px;
  }
  &>span {
    font-weight: 700;
    font-size: 1.4rem;
  }
`
