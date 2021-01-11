import React from 'react';
import './App.css';
import { PlayerList } from './components/player-list/player-list';
import { SelectPositions } from './components/select-position/select-positions';
import { STANDARD_POSITIONS } from './entities/positions/position';
import { AllPlayers } from './components/all-players/all-players';
import { ROOKIES_2019 } from './entities/players/constants/2019-rookies';
import { DraftBoard } from './components/draft-board/draft-board';
import { Draft } from './entities/draft/draft';
import { useAutoDraft } from './hooks/use-auto-draft';
import { Controls } from './components/controls/controls';

export function App() {
  const [positions, setPositions] = React.useState(STANDARD_POSITIONS);
  const [draft, _setDraft] =
    React.useState(
      Draft.newBuilder()
        .setNumTeams(5)
        .setNumRounds(2)
        .setPositions(positions)
        .setPlayers(ROOKIES_2019.filter(player => positions.includes(player.position)))
        .build());
  console.log('App.draft', draft);
  const setDraft = (foo: Draft) => {
    console.log('setDraft()', foo);
    _setDraft(foo);
  }
  useAutoDraft({draft, setDraft});

  return (
    <>
      <SelectPositions positions={positions} setPositions={setPositions} />
      <Controls
        draft={draft}
        setDraft={setDraft} />
      <DraftBoard draft={draft} setDraft={setDraft} numTeams={draft.numTeams} numRounds={draft.numRounds} />
      <div style={{display: 'flex'}}>
        <AllPlayers draft={draft} setDraft={setDraft} />
        {getPlayerListsForEachPosition()}
      </div>
    </>);

  function getPlayerListsForEachPosition() {
    return positions
      .map(position => draft.players.filter(player => player.position === position))
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
