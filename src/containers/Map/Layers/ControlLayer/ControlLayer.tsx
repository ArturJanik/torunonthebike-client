import ZoomControl from './ZoomControl/ZoomControl';
import { MapFilters } from './MapFilters/MapFilters';
import { CitybikeButton } from './CitybikeButton/CitybikeButton';

interface ControlLayerProps {
  toggleCitybikes: () => void;
}

export const ControlLayer = ({ toggleCitybikes }: ControlLayerProps): JSX.Element => (
  <>
    <ZoomControl />
    <MapFilters />
    <CitybikeButton onClick={ toggleCitybikes } />
  </>
);
