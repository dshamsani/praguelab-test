import { FC } from "react";
import styled from "styled-components";
import InstanBookableIcon from "../../../../icons/InstanBookableIcon";

interface IHomePageFilterHeader {
  title: string;
  instant?: boolean;
}

const HomePageFilterHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  .title {
    font-size: 16px;
    color: #9c8c8c;
  }
`;

const HomePageFilterHeader: FC<IHomePageFilterHeader> = ({ title, instant = false }) => {
  return (
    <HomePageFilterHeaderStyled>
      <span className="title">{title}</span>
      {instant && <InstanBookableIcon />}
    </HomePageFilterHeaderStyled>
  );
};

export default HomePageFilterHeader;
