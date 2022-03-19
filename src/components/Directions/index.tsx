import Direction, {
  MapViewDirectionsProps as DirectionsProps,
} from 'react-native-maps-directions';

export function Directions({ ...props }: Omit<DirectionsProps, 'apikey'>) {
  return (
    <Direction
      apikey={process.env.GOOGLE_MAPS_API_KEY}
      strokeColor="#222"
      strokeWidth={3}
      {...props}
    />
  );
}
