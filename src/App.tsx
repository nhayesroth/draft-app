import React from 'react';
import './App.css';
import { PlayerList } from './components/player-list/player-list';
import { SelectPositions } from './components/select-position/select-positions';
import { STANDARD_POSITIONS } from './entities/positions/position';
import { AllPlayers } from './components/all-players/all-players';
import { ROOKIES_2019 } from './entities/players/constants/2019-rookies';

export function App() {
  const [positions, setPositions] = React.useState(STANDARD_POSITIONS);
  return (
    <>
      <SelectPositions positions={positions} setPositions={setPositions} />
      <div style={{display: 'flex'}}>
        <AllPlayers positions={positions} />
        {getPlayerListsForEachPosition()}
      </div>
    </>
  );

  function getPlayerListsForEachPosition() {
    return positions
      .map(position => ROOKIES_2019.filter(player => player.position === position))
      .map(players => <PlayerList players={players} header={players[0].position} includeAge includeSchool
                                  includeTeam />);
  }
}
