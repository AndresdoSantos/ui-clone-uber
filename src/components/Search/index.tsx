import { Platform } from 'react-native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';

interface SearchProps {
  onLocateSelected: (
    data: GooglePlaceData,
    detail: GooglePlaceDetail | null
  ) => void;
}

export function Search({ onLocateSelected }: SearchProps) {
  return (
    <GooglePlacesAutocomplete
      placeholder="Para onde?"
      query={{ key: process.env.GOOGLE_MAPS_API_KEY, language: 'pt' }}
      onPress={onLocateSelected}
      textInputProps={{
        autoCapitalize: 'none',
        autoCorrect: false,
        placeholderTextColor: '#333',
      }}
      fetchDetails
      enablePoweredByContainer={false}
      styles={{
        container: {
          position: 'absolute',
          top: Platform.OS === 'ios' ? 60 : 40,
          width: '100%',
        },
        textInputContainer: {
          flex: 1,
          backgroundColor: 'transparent',
          height: 52,
          marginHorizontal: 20,
          borderTopWidth: 0,
          borderBottomWidth: 0,
        },
        textInput: {
          height: 52,
          margin: 0,
          borderRadius: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 20,
          paddingLeft: 20,
          marginTop: 0,
          marginRight: 0,
          marginLeft: 0,
          elevation: 5,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { x: 0, y: 0 },
          shadowRadius: 16,
          borderWidth: 1,
          borderColor: '#ddd',
          fontSize: 18,
        },
        listView: {
          borderWidth: 1,
          borderColor: '#ddd',
          backgroundColor: '#fff',
          marginHorizontal: 20,
          elevation: 5,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { x: 0, y: 0 },
          shadowRadius: 16,
          marginTop: 10,
        },
        description: {
          fontSize: 16,
        },
        row: {
          padding: 20,
          height: 56,
        },
      }}
    />
  );
}
