import { Draft } from '../entities/draft/draft';
import { useInterval } from 'react-interval-hook';
import { PlayerSelection } from '../entities/draft/player-selection';
import React from 'react';
import { State } from '../entities/draft/state';

interface Args {
  draft: Draft,
  setDraft: (draft: Draft) => void,
}

export function useAutoDraft(args: Args) {
  const {start, stop} = useInterval(autoDraftPlayer, 1000);
  const draftState: State = args.draft.state;

  React.useEffect(() => {
    if (draftState === State.AUTO_DRAFT) {
      start();
    } else {
      stop();
    }
  }, [draftState, start, stop]);

  React.useEffect(() => {
    if (args.draft.isComplete()) {
      stop();
    }
  }, [args.draft, stop]);

  function autoDraftPlayer() {
    const player = args.draft.players.find(player => !args.draft.alreadyDrafted(player));
    if (player === undefined) {
      throw new Error('Could not find player to autodraft');
    }
    console.log('useAutoDraft - pick', args.draft.currentRound, args.draft.currentPick);
    console.log('useAutoDraft - player', player);
    const selection =
      PlayerSelection.newBuilder()
        .setPlayer(player)
        .setRound(args.draft.currentRound)
        .setPick(args.draft.currentPick)
        .build();
    console.log('useAutoDraft - selection', selection);
    const draft = args.draft.makePlayerSelection(selection)
    args.setDraft(draft);
  }
}

