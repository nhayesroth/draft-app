import { Player } from '../../entities/players/player';
import PropTypes from 'prop-types';
import { ROOKIES_2019 } from '../../entities/players/constants/2019-rookies';
import { Draft } from '../../entities/draft/draft';
import { PlayerSelection } from '../../entities/draft/player-selection';

interface Props {
  header: string;
  players: Player[],
  draft: Draft,
  setDraft: (draft: Draft) => void,
  includePosition: boolean,
  includeAge: boolean,
  includeSchool: boolean,
  includeTeam: boolean,
}

const DEFAULT_PROPS: Props = {
  header: 'Players',
  players: ROOKIES_2019,
  draft: Draft.newBuilder().build(),
  setDraft: () => {},
  includeAge: false,
  includePosition: false,
  includeSchool: false,
  includeTeam: false,
}

export function PlayerList(props: Props = DEFAULT_PROPS) {
  return (
    <div style={{}}>
      {props.header || 'Players'}
      <ol style={{flex: 1}}>
        {props.players.map((player, index) => toPlayerListItem(player, index))}
      </ol>
    </div>
  );

  function toPlayerListItem(player: Player, index: number) {
    const playerAlreadyDrafted = props.draft.alreadyDrafted(player);
    return (
      <li key={index} style={playerAlreadyDrafted ? {textDecoration: 'line-through'} : {}}>
        <div
          onClick={
            // TODO: only when it's my turn!
            props.draft.inProgress() && !props.draft.isComplete()
              ? draftPlayer
              : () => {}
          }>
          {getString()}
        </div>
      </li>
    );

    function draftPlayer() {
      const playerSelection =
        PlayerSelection.newBuilder()
          .setRound(props.draft.currentRound)
          .setPick(props.draft.currentPick)
          .setPlayer(player)
          .build();
      const draft =
        props
          .draft
          .makePlayerSelection(playerSelection);
      props.setDraft(draft);
      console.log('Drafted player: ', playerSelection);
    }

    function getString() {
      return [
        player.name,
        props.includePosition ? `(${player.position})` : null,
        props.includeSchool ? `(${player.school})` : null,
        props.includeAge ? player.age : null,
        props.includeTeam ? player.team : null,
      ].filter(e => e).join(' ');
    }
  }
}

PlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({})),
};

PlayerList.defaultProps = {
  players: ROOKIES_2019,
};
