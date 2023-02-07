import { Spinner } from "@chakra-ui/react";
import { FC, useState } from "react";
import styled from "styled-components";
import LogoIcon from "../../../icons/LogoIcon";
import IData, { IDataItem } from "../../../types/IData";
import HomePageCaravans from "./HomePageCaravans";
import HomePageFilter from "./HomePageFilter";

const HomePageStyled = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  align-items: start;

  .logo {
    align-self: center;
  }

  @media (min-width: 1280px) {
    .logo {
      align-self: flex-start;
    }
  }
`;

const SpinnerStyled = styled.div`
  width: 100%;
  padding-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomePage: FC<IData> = ({ data }) => {
  const [itemsData, setItemsData] = useState<{
    count: number;
    items: IDataItem[];
  } | null>(null);

  return (
    <HomePageStyled>
      <div className="logo">
        <LogoIcon />
      </div>
      <HomePageFilter data={data} setItemsData={setItemsData} />
      {itemsData == null && (
        <SpinnerStyled>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </SpinnerStyled>
      )}
      {itemsData !== null && <HomePageCaravans data={itemsData} />}
    </HomePageStyled>
  );
};

export default HomePage;
