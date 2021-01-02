import { Player } from '../../entities/players/player';
import { PlayerList } from '../player-list/player-list';

interface Props {
  players: Player[]
}


export function SinglePositionPlayerList(props: Props) {
  verifySinglePosition();

  return (
    <>
      {makeColumnHeader()}
      <PlayerList players={props.players} />
    </>
  );

  function makeColumnHeader() {
    return (
      <div>{props.players[0].position}</div>
    );
  }

  function verifySinglePosition() {
    const positions =
      props
        .players
        .map(player => player.position);
    if (positions.length > 1) {
      throw new Error('Should only have a single position, but found more: ' + positions.join(', '));
    }
    if (positions.length === 0) {
      throw new Error('No positions found.');
    }
  }
}
