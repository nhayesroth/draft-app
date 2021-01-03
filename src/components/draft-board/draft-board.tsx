import { Draft } from '../../entities/draft/draft';

interface Props {
  numRounds: number,
  numTeams: number,
  draft: Draft,
  setDraft: (draft: Draft) => void,
}

export function DraftBoard(props: Props) {
  const BORDER = {border: 'black', borderStyle: 'solid', borderWidth: '1px'};
  return (
    <table style={BORDER}>
      {getHeaders()}
      {getDraftRows()}
    </table>
  );

  function getHeaders() {
    return (
      <tr>{generateTeamNames().map(drafter => <th style={BORDER}>{drafter}</th>)}</tr>
    );

    function generateTeamNames() {
      return [...Array(props.numTeams).keys()]
        .map(index => 'Team-' + (index + 1));
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
    if (selection) {
      return (
        <td style={BORDER}>
          {`${formatPick()} ${selection.player.name} (${selection.player.position})`}
        </td>);
    }
    return <td style={BORDER}>{formatPick()}</td>;

    function getSelection() {
      return props.draft.selections[args.round]?.[args.pick];
    }

    function formatPick() {
      return args.pick < 10
        ? `${args.round}.0${args.pick}`
        : `${args.round}.${args.pick}`;
    }
  }
}
