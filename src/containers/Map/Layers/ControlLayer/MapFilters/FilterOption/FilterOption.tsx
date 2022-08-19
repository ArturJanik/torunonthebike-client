import { FilterType, OptionValue } from '../../../../../../context/MapContext';
import styles from './FilterOption.module.css';

interface FilterOptionProps {
  filterType: FilterType;
  value: number;
  color: string;
  name: string;
  onClick: (optionValue: OptionValue) => void;
}

export const FilterOption = ({
  filterType,
  value,
  color,
  name,
  onClick,
}: FilterOptionProps): JSX.Element => {
  return (
    <p className={ styles.filterOption } key={ filterType + '-' + value } onClick={ () => onClick(value) }>
      <span className={ styles.filterOptionBox } style={ { background: color } }></span>
      { name }
    </p>
  )
}
