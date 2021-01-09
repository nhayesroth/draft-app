import { Draft } from '../../entities/draft/draft';
import { State } from '../../entities/draft/state';

interface Props {
  draft: Draft,
  setDraft: (draft: Draft) => void,
}

export function Controls(props: Props) {
  return (
    <div id={'draft-controls'}>
      {props.draft.state}
      {getAppropriateButtons()}
    </div>
  );

  function getAppropriateButtons() {
    switch (props.draft.state) {
      case State.AUTO_DRAFT:
      case State.USER_PICK:
        return <PauseDraftButton />;
      case State.CONFIGURING:
        return <StartDraftButton />;
      case State.FINISHED:
        return <RestartButton />;
      case State.PAUSED:
        return (
          <>
            <ResumeButton />
            <RestartButton />
          </>
        );
      case State.INVALID_STATE:
      default:
        console.log('Unexpected draft state: ' + props.draft.state);
    }
  }

  function RestartButton() {
    return <button onClick={restartDraft}>Draft Again!</button>;

    function restartDraft() {
      const draft = props.draft.restart();
      props.setDraft(draft);
    }
  }

  function PauseDraftButton() {
    return <button onClick={pauseDraft}>Pause Draft</button>;

    function pauseDraft() {
      const draft = props.draft.pause();
      props.setDraft(draft);
    }
  }

  function ResumeButton() {
    return <button onClick={resumeDraft}>Resume Draft</button>;

    function resumeDraft() {
      const draft = props.draft.resume();
      props.setDraft(draft);
    }
  }

  function StartDraftButton() {
    return <button onClick={startDraft}>Start Draft</button>;

    function startDraft() {
      const draft = props.draft.start();
      props.setDraft(draft);
    }
  }
}
