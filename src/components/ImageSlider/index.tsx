import React, { useRef, useState } from "react";
import { FlatList, StatusBar, ViewToken } from "react-native";
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

interface ChangeImageProps {
  viweableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrls }: Props) {
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <ImageIndexs>
        {imagesUrls.map((_, index) => (
          <ImageIndex key={String(index)} active />
        ))}
      </ImageIndexs>
      <FlatList
        data={imagesUrls}
        keyExtractor={(key) => key}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
}
