interface Props {
  draftInProgress: boolean
  setDraftInProgress: (draftInProgress: boolean) => void,
}

export function StartOrPauseButton(props: Props) {
  return (
    props.draftInProgress
      ? <PauseDraftButton />
      : <StartDraftButton />
  );

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
