import { STYLES } from './styles';
import { Draft } from '../../entities/draft/draft';
import { State } from '../../entities/draft/state';
import { Pick } from '../../entities/draft/pick';

export function TeamNameHeader(
  props: {
    draft: Draft,
    setDraft: (draft: Draft) => void,
    teamName: string,
    teamIndex: number
  }) {
  return (
    <th
      style={STYLES.BORDER}
      onClick={() => claimTeam(props.teamIndex)}>
      {props.teamName}
    </th>
  );

  function claimTeam(index: number) {
    if (props.draft.state !== State.CONFIGURING) return;
    const teamNames = [...props.draft.teamNames];
    const oldTeamIndex = teamNames.findIndex(s => s === 'My Team');
    if (oldTeamIndex !== -1) {
      teamNames[oldTeamIndex] = 'Team-' + (oldTeamIndex + 1);
    }
    teamNames[index] = 'My Team';
    let userPicks: Pick[] = [];
    console.log('claimTeam() - index', index);
    for (let round = 1; round <= props.draft.numRounds; round += 1) {
      const pick = new Pick(round, index + 1);
      userPicks = userPicks.concat(pick);
      console.log('claimTeam() - addPick()', pick);
    }
    props.setDraft(
      props.draft.toBuilder()
        .setTeamNames(teamNames)
        .setUserPicks(userPicks)
        .build());
  }
}
