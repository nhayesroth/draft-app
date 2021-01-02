import { PlayerList } from '../player-list/player-list';
import { ROOKIES_2019 } from '../../entities/players/constants/2019-rookies';

interface Props {
  positions: string[],
}

export function AllPlayers(props: Props) {
  return (
    <PlayerList
      header={'All Players'}
      players={ROOKIES_2019.filter(player => props.positions.includes(player.position))}
      includePosition
      includeTeam />
  );
}
