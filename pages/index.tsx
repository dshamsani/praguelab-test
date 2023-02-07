import { GetServerSideProps } from "next";
import Head from "next/head";
import { FC } from "react";
import styled from "styled-components";
import HomePage from "../src/components/HomePage";
import IData from "../types/IData";

const Home: FC<IData> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Prague labs - testovací projekt karavany</title>
        <meta
          name="description"
          content="Cílem tohoto zadání je prověřit si základní znalosti vývoje responsivních webových aplikací v Reactu."
          key="desc"
        />
        <meta property="og:title" content="Prague labs - testovací projekt karavany" />
        <meta property="og:description" content="testovací projekt karavany" />
        <meta property="og:url" content="http://localhost:3000/" />
        <meta property="og:image" content="https://d35xwkx70uaomf.cloudfront.net/01797fed-ef72-4df7-b08a-f48c67b0fd49.jpg" />
      </Head>
      <PageWrapper>
        <HomePage data={data} />
      </PageWrapper>
    </>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 16px;
`;

export default Home;

const getData = async () => {
  const response = await fetch("http://localhost:3000/api/data");
  return response.json();
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getData();
  return {
    props: {
      data,
    },
  };
};
