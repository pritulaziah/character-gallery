import { useState } from "react";
import SliderArrow from "./SliderArrow";
import Img from "../Img";
import styled from "@emotion/styled/macro";
import { ClassNames } from "@emotion/react/macro";

const SliderMain = styled("div")`
  width: 100%;
  height: 100%;
  position: relative;
`;

const SliderWrapper = styled("div")`
  width: 100%;
  display: flex;
  height: 100%;
  background-color: #f8f9f9;
`;

const SliderCounter = styled("div")`
  position: absolute;
  background: rgba(51, 51, 51, 0.5);
  border-radius: 4px;
  text-align: center;
  min-width: 40px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  left: 15px;
  bottom: 15px;
  z-index: 15;
`;

const SliderBlur = styled("div")<{ url: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  filter: blur(10px);
  background-color: #eee;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  z-index: 1;
  background-image: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.4)
    ),
    url(${(props) => props.url});
`;

export type Dir = "prev" | "next";

interface IProps {
  collection: string[];
}

const Slider = ({ collection }: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const currentSlide = collection[currentIndex];
  const slidesCount = collection.length;

  const onChangeSlide = (direction: Dir) => {
    setIsLoading(true);

    let newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex === -1) {
      newIndex = slidesCount - 1;
    }

    if (newIndex === slidesCount) {
      newIndex = 0;
    }

    setCurrentIndex(newIndex);
    setHasError(false);
  };

  const loadImage = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const errorImage = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const renderImage = () => {
    if (hasError || !currentSlide) {
      return <>{/* todo */}</>;
    }

    return (
      <>
        {!isLoading && <SliderBlur url={currentSlide} />}
        <ClassNames>
          {({ css }) => (
            <Img
              className={css`
                width: 100%;
                height: 100%;
                z-index: 10;
                object-fit: contain;
              `}
              src={currentSlide}
              loadImage={loadImage}
              errorImage={errorImage}
              lazy={false}
            />
          )}
        </ClassNames>
      </>
    );
  };

  const hasSlides = slidesCount > 1;

  return (
    <SliderMain>
      <SliderWrapper>{renderImage()}</SliderWrapper>
      {hasSlides && (
        <>
          <SliderArrow onChangeSlide={onChangeSlide} dir="prev" />
          <SliderArrow onChangeSlide={onChangeSlide} dir="next" />
        </>
      )}
      {hasSlides && (
        <SliderCounter>
          {currentIndex + 1}/{slidesCount}
        </SliderCounter>
      )}
      {isLoading && <>{/* todo */}</>}
    </SliderMain>
  );
};

export default Slider;
