import React from 'react';
import './App.css';
import { PlayerList } from './components/player-list/player-list';
import { SelectPositions } from './components/select-position/select-positions';
import { STANDARD_POSITIONS } from './entities/positions/position';
import { AllPlayers } from './components/all-players/all-players';
import { ROOKIES_2019 } from './entities/players/constants/2019-rookies';
import { DraftBoard } from './components/draft-board/draft-board';
import { Draft } from './entities/draft/draft';

export function App() {
  const [positions, setPositions] = React.useState(STANDARD_POSITIONS);
  const [draft, setDraft] = React.useState(Draft.newBuilder().setNumTeams(10).setNumRounds(5).build());
  return (
    <>
      <SelectPositions positions={positions} setPositions={setPositions} />
      <DraftBoard draft={draft} setDraft={setDraft} numTeams={10} numRounds={5} />
      <div style={{display: 'flex'}}>
        <AllPlayers positions={positions} />
        {getPlayerListsForEachPosition()}
      </div>
    </>
  );

  function getPlayerListsForEachPosition() {
    return positions
      .map(position => ROOKIES_2019.filter(player => player.position === position))
      .map(
        players =>
          <PlayerList
            players={players}
            header={players[0].position}
            draft={draft}
            setDraft={setDraft}
            includeAge
            includeSchool
            includeTeam />);
  }
}
