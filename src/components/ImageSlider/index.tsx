import React from "react";
import {
  CarImage,
  CarImageWrapper,
  Container,
  ImageIndex,
  ImageIndexs,
} from "./styles";

interface Props {
  imagesUrls: string[];
}

export function ImageSlider({ imagesUrls }: Props) {
  return (
    <Container>
      <ImageIndexs>
        <ImageIndex active />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndexs>
      <CarImageWrapper>
        <CarImage source={{ uri: imagesUrls[0] }} resizeMode="contain" />
      </CarImageWrapper>
    </Container>
  );
}
