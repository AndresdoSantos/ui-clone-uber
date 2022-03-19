import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';

import { Search } from '../Search';
import { Directions } from '../Directions';

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Destination {
  latitude: number;
  longitude: number;
  title: string;
}

export function Map() {
  const [currentPosition, setCurrentPosition] = useState<Region | null>(null);
  const [destination, setDestination] = useState<Destination | null>(null);

  useEffect(() => {
    async function getPosition() {
      Geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCurrentPosition({
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          });
        },
        () => {},
        {
          timeout: 2000,
          enableHighAccuracy: true,
          maximumAge: 1000,
        }
      );
    }

    if (!currentPosition) getPosition();
  }, [currentPosition]);

  const handleLocationSelected = useCallback(
    (data: GooglePlaceData, { geometry }: GooglePlaceDetail | null) => {
      const {
        location: { lat: latitude, lng: longitude },
      } = geometry;

      setDestination({
        latitude,
        longitude,
        title: data.structured_formatting.main_text,
      });
    },
    []
  );

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={currentPosition}
        showsUserLocation
        loadingEnabled
      >
        {destination && (
          <Directions
            origin={currentPosition}
            destination={destination}
            onReady={() => {}}
          />
        )}
      </MapView>

      <Search onLocateSelected={handleLocationSelected} />
    </View>
  );
}
