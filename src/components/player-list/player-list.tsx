import { Player } from '../../entities/players/player';
import PropTypes from 'prop-types';
import { ROOKIES_2019 } from '../../entities/players/constants/2019-rookies';

interface Props {
  header: string;
  players: Player[]
  includePosition: boolean,
  includeAge: boolean,
  includeSchool: boolean,
  includeTeam: boolean,
}

const DEFAULT_PROPS: Props = {
  header: 'Players',
  players: ROOKIES_2019,
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
    return (
      <li key={index}>
        <div>{getString()}</div>
      </li>
    );

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
