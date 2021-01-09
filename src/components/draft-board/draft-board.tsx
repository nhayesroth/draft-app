import { Draft } from '../../entities/draft/draft';
import { Pick } from '../../entities/draft/pick';
import { PlayerSelection } from '../../entities/draft/player-selection';
import { State } from '../../entities/draft/state';

interface Props {
  numRounds: number,
  numTeams: number,
  draft: Draft,
  setDraft: (draft: Draft) => void,
}

export function DraftBoard(props: Props) {
  const BORDER = {border: 'black', borderStyle: 'solid', borderWidth: '1px'};
  const USER_PICK = {border: 'black', borderStyle: 'solid', borderWidth: '4px'};
  return (
    <table style={BORDER}>
      <colgroup>
        <col span={props.numTeams} style={{minWidth: '200px'}} />
      </colgroup>
      {getTeamNameHeaders()}
      {getDraftRows()}
    </table>
  );

  function getTeamNameHeaders() {
    const teamNames = props.draft.teamNames;
    console.log('teamNames', teamNames);
    return (
      <tr>{
        teamNames
          .map((teamName, index) => {
            return <th style={BORDER} onClick={() => claimTeam(index)}>{teamName}</th>
          })}
      </tr>
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

  function getDraftRows() {
    return [...Array(props.numRounds).keys()]
      .map(rowIndex => <DraftRow round={rowIndex + 1} />);
  }

  interface RowArgs {
    round: number,
  }

  function DraftRow(args: RowArgs) {
    return (
      <tr>{
        [...Array(props.numTeams).keys()]
          .map(
            colIndex =>
              <DraftCell round={args.round} pick={colIndex + 1} />)}
      </tr>);
  }

  interface CellArgs {
    round: number,
    pick: number,
  }

  function DraftCell(args: CellArgs) {
    const selection = getSelection();
    const pick: Pick = new Pick(args.round, args.pick);
    const isUserPick = props.draft.isUserPick(pick);
    return (
      <td style={isUserPick ? USER_PICK : BORDER} onClick={toggleUserPick}>
        <CellHeader isUserPick={isUserPick} />
        {selection
          ? `${formatPick()} ${selection.player.name} (${selection.player.position})`
          : `${formatPick()}`}
      </td>);

    function getSelection(): PlayerSelection | null {
      return props.draft.selections[args.round]?.[args.pick];
    }

    function formatPick() {
      return args.pick < 10
        ? `${args.round}.0${args.pick}`
        : `${args.round}.${args.pick}`;
    }

    function toggleUserPick() {
      if (props.draft.state !== State.CONFIGURING) return;
      if (props.draft.isUserPick(pick)) {
        props.setDraft(props.draft.removeUserPick(pick));
      } else {
        props.setDraft(props.draft.addUserPick(pick));
      }
    }
  }

  function CellHeader(props: { isUserPick: boolean }) {
    return props.isUserPick
      ? <div style={{backgroundColor: 'black', color: 'white'}}> My pick</div>
      : <br />;
  }
}
