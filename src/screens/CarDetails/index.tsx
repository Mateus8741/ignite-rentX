import React from "react";

import { BackButton } from "@/components/BackButton";
import { ImageSlider } from "@/components/ImageSlider";
import { Accessory } from "@/components/Accessory";

import SpeedSvg from "@assets/speed.svg";
import AccelerationSvg from "@assets/acceleration.svg";
import ForceSvg from "@assets/force.svg";
import GasolineSvg from "@assets/gasoline.svg";
import ExchangeSvg from "@assets/exchange.svg";
import PeopleSvg from "@assets/people.svg";

import {
  About,
  Brand,
  CarImages,
  Container,
  Content,
  Description,
  Details,
  Header,
  Name,
  Period,
  Price,
  Rent,
  Accessories,
  Footer,
} from "./styles";
import { Button } from "@/components/Button";
import { useNavigation } from "@react-navigation/native";

export function CarDetails() {
  const navigation = useNavigation<any>();
  function handleConfirmRental() {
    navigation.navigate("Scheduling");
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrls={[
            "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
            "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
            "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
          ]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Audi</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 60.000</Price>
          </Rent>
        </Details>
        <Accessories>
          <Accessory icon={SpeedSvg} name="Velocidade" />
          <Accessory icon={AccelerationSvg} name="Aceleração" />
          <Accessory icon={ForceSvg} name="Força" />
          <Accessory icon={GasolineSvg} name="Combustível" />
          <Accessory icon={ExchangeSvg} name="Auto" />
          <Accessory icon={PeopleSvg} name="2 Pessoas" />
        </Accessories>
        <About>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae
          aliquid inventore dicta voluptatem minus eveniet excepturi autem.
          Similique enim, voluptate corporis, distinctio eius, nisi quisquam
          sunt natus reiciendis temporibus qui?
        </About>
      </Content>
      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  );
}
