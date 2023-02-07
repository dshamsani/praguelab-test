import { Button } from "@chakra-ui/react";
import { FC, useState } from "react";
import styled from "styled-components";
import IData from "../../../../types/IData";
import HomePageCaravansItem from "./HomePageCaravansItem";

const HomePageCaravansItemsStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding-top: 68px;
  width: 100%;
  gap: 32px;
  place-items: center;
  @media (min-width: 1280px) {
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
  }
`;

const HomePageCaravansStyled = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 60px;
  padding-bottom: 30px;
`;

const HomePageCaravans: FC<IData> = ({ data }) => {
  const loadPerRow = 3;
  const [next, setNext] = useState<number>(6);

  const handleMoreItems = () => {
    setNext(next + loadPerRow);
  };

  return (
    <HomePageCaravansStyled>
      <HomePageCaravansItemsStyled>
        {(data.items.slice(0, next) || []).map((item, i) => {
          return <HomePageCaravansItem key={i} data={item} />;
        })}
      </HomePageCaravansItemsStyled>
      {next < data?.items.length && (
        <Button colorScheme="teal" size="lg" onClick={handleMoreItems}>
          Načíst další
        </Button>
      )}
    </HomePageCaravansStyled>
  );
};

export default HomePageCaravans;
