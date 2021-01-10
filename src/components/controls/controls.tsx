import { DisplayMode } from './display-mode';
import { State } from '../../entities/draft/state';
import { ChooseWhatToConfigure, Props } from './choose-what-to-configure';


export function Controls(props: Props) {
  return (
    <div
      id={'draft-controls'}
      style={{width: 'max-content', borderWidth: '1px', borderColor: 'black', borderStyle: 'solid'}}
    >
      Controls
      <DisplayMode draft={props.draft} />
      {getAppropriateButtons()}
    </div>
  );

  function getAppropriateButtons() {
    switch (props.draft.state) {
      case State.AUTO_DRAFT:
      case State.USER_PICK:
        return <PauseDraftButton />;
      case State.CONFIGURING:
        return (
          <>
            <ChooseWhatToConfigure draft={props.draft} setDraft={props.setDraft} />
            <StartDraftButton />
          </>
        );
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
