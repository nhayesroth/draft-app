import { Draft } from '../../entities/draft/draft';

interface Props {
  draft: Draft,
  setDraft: (draft: Draft) => void,
  draftInProgress: boolean
  setDraftInProgress: (draftInProgress: boolean) => void,
}

export function Controls(props: Props) {
  if (props.draft.isComplete()) {
    return <RestartButton />;
  }
  if (props.draftInProgress) {
    return <PauseDraftButton />;
  }
  return <StartDraftButton />;

  function RestartButton() {
    return <button onClick={restartDraft}>Draft Again!</button>;

    function restartDraft() {
      const draft =
        props.draft.toBuilder()
          .setSelections([])
          .setCurrentRound(1)
          .setCurrentPick(1)
          .build();
      props.setDraft(draft);
      props.setDraftInProgress(false);
    }
  }

  function PauseDraftButton() {
    return <button onClick={pauseDraft}>Pause Draft</button>;

    function pauseDraft() {
      props.setDraftInProgress(false);
    }
  }

  function StartDraftButton() {
    return <button onClick={startDraft}>Start Draft</button>;

    function startDraft() {
      props.setDraftInProgress(true);
    }
  }
}
