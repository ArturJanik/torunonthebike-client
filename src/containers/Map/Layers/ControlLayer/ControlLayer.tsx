import ZoomControl from './ZoomControl/ZoomControl';
import { MapFilters } from './MapFilters/MapFilters';

export const ControlLayer = (): JSX.Element => (
  <>
    <ZoomControl />
    <MapFilters />
  </>
);
