import {
  Input,
  InputGroup,
  InputRightElement,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
} from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { IDataItem } from "../../../../types/IData";
import HomePageFilterHeader from "./HomePageFilterHeader";

const HomePageFilterStyled = styled.section`
  display: flex;
  width: 100%;
  height: 750px;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  @media (min-width: 1280px) {
    flex-direction: row;
    height: 200px;
  }

  .slider {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 25px;
    max-width: 392px;
    width: 100%;
    height: 100%;
    border: 1px solid #edeae3;

    &-inputs {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
    }

    @media (min-width: 1280px) {
      max-width: 328px;
    }
  }

  .caravan-type {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 25px;
    max-width: 392px;
    width: 100%;
    height: 100%;
    border: 1px solid #edeae3;

    &-items {
      display: flex;
      flex-direction: column;
      gap: 16px;
      overflow: hidden;

      @media (min-width: 1280px) {
        flex-direction: row;
      }
    }

    &-item {
      border: 1px solid #edeae3;
      padding: 8px;
      border-radius: 8px;

      &-heading {
        color: #1f2244;
        font-size: 16px;
        font-weight: 700;
      }

      &-info {
        font-size: 14px;
        color: #9c8c8c;
      }

      &:hover {
        cursor: pointer;
      }
    }

    .selected {
      border: 2px solid #119383;
    }

    @media (min-width: 1280px) {
      max-width: fit-content;
    }
  }

  .instant {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 25px;
    max-width: 392px;
    width: 100%;
    height: 100%;
    border: 1px solid #edeae3;
  }
`;

interface IHomePageFilter {
  data: {
    count: number;
    items: IDataItem[];
  };
  setItemsData: Dispatch<
    SetStateAction<{
      count: number;
      items: IDataItem[];
    } | null>
  >;
}

const HomePageFilter: FC<IHomePageFilter> = ({ data, setItemsData }) => {
  const [sliderMinValue, setSliderMinValue] = useState<number>(100);
  const [sliderMaxValue, setSliderMaxValue] = useState<number>(10000);
  const [instantValue, setInstantValue] = useState<1 | 0>(1);
  const [type, setType] = useState<string>("");
  const [typeData, setTypeData] = useState<Array<string>>([]);
  const vehicleTypes: Array<string> = [];
  data.items.map((item) => {
    vehicleTypes.push(item?.vehicleType);
  });
  const vehicleTypesSet = new Set(vehicleTypes);

  const typeChange = (value: string | undefined) => {
    const items = document.getElementById("items");

    if (typeof value === "string") {
      if (items?.childNodes.length) {
        for (let i = 0; i < items?.childNodes.length; i++) {
          // @ts-ignore
          if (items.childNodes[i].firstChild?.innerHTML == value) {
            // @ts-ignore
            if (items.childNodes[i].classList.contains("selected")) {
              // @ts-ignore
              items.childNodes[i].classList.remove("selected");
              const newTypeData = typeData.filter((e) => e !== value);
              setTypeData(newTypeData);
            } else {
              // @ts-ignore
              items.childNodes[i].classList.add("selected");
              if (typeData.length > 0) {
                setTypeData([...typeData, value]);
              } else {
                setTypeData([value]);
              }
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    let newData = data.items
      .filter((e) => {
        if (e.price >= sliderMinValue && e.price <= sliderMaxValue) {
          if (e.instantBookable == Boolean(instantValue)) {
            if (typeData.length == 0) {
              return e;
            }
            for (let i = 0; i < typeData.length; i++) {
              if (typeData.length != 0 && typeData[i] == e.vehicleType) {
                return e;
              }
            }
          }
        }
      })
      .sort((a, b) => {
        let priceA = a.price;
        let priceB = b.price;
        return priceB - priceA;
      });

    setItemsData({
      count: newData.length,
      items: newData,
    });
  }, [sliderMinValue, sliderMaxValue, instantValue, type, typeData]);

  const valueChange = (value: number[]) => {
    setSliderMinValue(value[0]);
    setSliderMaxValue(value[1]);
  };

  return (
    <HomePageFilterStyled>
      <div className="slider">
        <HomePageFilterHeader title="Cena za den" />
        <RangeSlider
          aria-label={["min", "max"]}
          onChange={(value: number[]) => valueChange(value)}
          colorScheme="teal"
          value={[sliderMinValue > sliderMaxValue ? sliderMaxValue - 800 : sliderMinValue, sliderMaxValue < 1000 ? 800 : sliderMaxValue]}
          defaultValue={[100, 5000]}
          min={100}
          max={10000}
        >
          <RangeSliderTrack bg="#EDEAE3">
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb bg="teal" boxSize={6} index={0} />
          <RangeSliderThumb bg="teal" boxSize={6} index={1} />
        </RangeSlider>
        <div className="slider-inputs">
          <InputGroup>
            <Input
              type="number"
              min="100"
              htmlSize={6}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSliderMinValue(Number(event.target.value) > sliderMaxValue ? sliderMaxValue : Number(event.target.value))
              }
              value={sliderMinValue == 0 ? "" : sliderMinValue}
            />
            <InputRightElement children="Kč" />
          </InputGroup>
          <InputGroup>
            <Input
              type="number"
              max="10000"
              htmlSize={6}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSliderMaxValue(Number(event.target.value))}
              value={sliderMaxValue == 0 ? "" : sliderMaxValue}
            />
            <InputRightElement children="Kč" />
          </InputGroup>
        </div>
      </div>
      <div className="caravan-type">
        <HomePageFilterHeader title="Typ karavanu" />
        <div id="items" className="caravan-type-items">
          {Array.from(vehicleTypesSet).map((item, i) => (
            <div
              key={i}
              onClick={(e: React.MouseEvent<HTMLElement>) => typeChange(e.currentTarget.firstElementChild?.innerHTML)}
              className="caravan-type-item"
            >
              <h3 className="caravan-type-item-heading">{item}</h3>
              <span className="caravan-type-item-info">Král mezi karavany. Luxus na kolech.</span>
            </div>
          ))}
        </div>
      </div>
      <div className="instant">
        <HomePageFilterHeader title="Okamžitá rezervace" instant />
        <Select
          onChange={(e) => {
            if (Number(e.target.value) == 0) {
              setInstantValue(0);
            }
            if (Number(e.target.value) == 1) {
              setInstantValue(1);
            }
          }}
        >
          <option value={1}>Ano</option>
          <option value={0}>Ne</option>
        </Select>
      </div>
    </HomePageFilterStyled>
  );
};

export default HomePageFilter;
