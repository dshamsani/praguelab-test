import { FC } from "react";
import styled from "styled-components";
import { IDataItem } from "../../../../../types/IData";
import Image from "next/future/image";
import PassengersCapacityIcon from "../../../../../icons/PassengersCapacityIcon";
import SleepCapacityIcon from "../../../../../icons/SleepCapacityIcon";
import ToiletIcon from "../../../../../icons/ToiletIcon";
import ShowerIcon from "../../../../../icons/ShowerIcon";
import InstanBookableIcon from "../../../../../icons/InstanBookableIcon";
import { Carousel } from "react-responsive-carousel";

interface IHomePageCaravansItem {
  data: IDataItem;
}

const HomePageCaravansItemStyled = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 392px;
  width: 100%;
  height: 380px;
  border: 1px solid #edeae3;
  border-radius: 8px;

  .item-info {
    width: 100%;
    padding: 12px; 16px;
    display: flex;
    flex-direction: column;

    &-span {
      color: #FF5E55;
      font-size: 12px;
      letter-spacing: 1px;
      text-transform: uppercase;
      font-weight: 700;
      padding-bottom: 2px;
    }

    &-name {
      color: #1F2244;
      text-align: left;
      font-size: 24px;
      font-weight: 700;
      padding-bottom: 5px;
    }

    &-about {
      border-top: 1px solid #EDEAE3;
      border-bottom: 1px solid #EDEAE3;
      padding: 9px 0;

      &-location {
        color: #1F2244;
        text-align: left;
        font-size: 16px;
        font-weight: 400;
      }

      &-availability {
        display: flex;
        padding-top: 9px;
        gap: 12px;
      }

      &-capacity {
        display: flex;
        justify-items: center;
        align-items: center;
        gap: 4px;
      }
    }

    &-price {
      display: flex;
      width: 100%;
      padding-top: 12px;
      justify-content: space-between;

      &-text {
        color: #9C8C8C;
        font-size: 16px;
      }

      &-div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        &-span {
          color: #1F2244;
          text-align: right;
          font-size: 16px;
          font-weight: 700;
        }
      }
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 190px;
  .item-image {
    object-fit: cover;
    width: 100%;
    height: 190px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`;

const HomePageCaravansItem: FC<IHomePageCaravansItem> = ({ data }) => {
  const { pictures, name, location, sleepCapacity, passengersCapacity, shower, instantBookable, price, toilet, vehicleType } = data;
  return (
    <HomePageCaravansItemStyled>
      {pictures && (
        <Carousel showStatus={false} showIndicators={false} showThumbs={false} swipeable emulateTouch useKeyboardArrows>
          {(pictures || []).map((item, i) => {
            return (
              <ImageWrapper key={i}>
                {/* <Image src={item} alt={name} fill className="item-image" /> */}
                <img src={item} alt="alt" className="item-image" />
              </ImageWrapper>
            );
          })}
        </Carousel>
      )}

      {/* <ImageWrapper>
        <Image src={pictures[0]} alt={name} fill className="item-image" loading="lazy" />
        <img src={pictures[0]} alt="alt" className="item-image" />
      </ImageWrapper> */}

      <div className="item-info">
        <span className="item-info-span">{vehicleType}</span>
        <span className="item-info-name">{name}</span>
        <div className="item-info-about">
          <span className="item-info-about-location">{location}</span>
          <div className="item-info-about-availability">
            <div className="item-info-about-capacity">
              <PassengersCapacityIcon />
              <span>{passengersCapacity}</span>
            </div>
            <div className="item-info-about-capacity">
              <SleepCapacityIcon />
              <span>{sleepCapacity}</span>
            </div>
            {toilet && (
              <div className="item-info-about-capacity">
                <ToiletIcon />
              </div>
            )}
            {shower && (
              <div className="item-info-about-capacity">
                <ShowerIcon />
              </div>
            )}
          </div>
        </div>
        <div className="item-info-price">
          <span className="item-info-price-text">Cena od</span>
          <div className="item-info-price-div">
            <span className="item-info-price-div-span">{price} Kč/den</span>
            {instantBookable && <InstanBookableIcon />}
          </div>
        </div>
      </div>
    </HomePageCaravansItemStyled>
  );
};

export default HomePageCaravansItem;
