import { PlayerList } from '../player-list/player-list';
import { Draft } from '../../entities/draft/draft';

interface Props {
  draft: Draft,
  setDraft: (draft: Draft) => void,
}

export function AllPlayers(props: Props) {
  return (
    <PlayerList
      header={'All Players'}
      draft={props.draft}
      setDraft={props.setDraft}
      players={props.draft.players}
      includePosition
      includeTeam />
  );
}
