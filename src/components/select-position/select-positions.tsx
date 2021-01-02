import Select, { ValueType } from 'react-select';
import React from 'react';
import { Position } from '../../entities/positions/position';

// const OPTIONS =
//     EnumUtils.keys(Position)
//         .filter(position => position !== 'NO_POSITION')
//         .map(position => {
//             return {value: position, label: position}
//         });

interface Props {
  positions: string[],
  setPositions: (positions: Position[]) => void,
}

export function SelectPositions(props: Props) {
  const ALL_POSITIONS = Object.keys(Position).filter(key => key !== Position.NO_POSITION);

  return (
    <Select
      isMulti
      options={ALL_POSITIONS.map(toOption)}
      onChange={handleChange}
      value={props.positions.map(toOption)}
    />
  );

  function handleChange(value: ValueType<{ label: string; value: string; }, true>) {
    const newPositions = value?.map(option => Position[option.label as keyof typeof Position]) || [];
    props.setPositions(newPositions);
  }

  function toOption(position: string) {
    return {
      label: position,
      value: position,
    };
  }
}
