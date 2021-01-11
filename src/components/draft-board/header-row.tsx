import { Draft } from '../../entities/draft/draft';
import { TeamNameHeader } from './team-name-header';

export function HeaderRow(
  props: {
    draft: Draft,
    setDraft: (draft: Draft) => void,
  }) {
  const teamNames = props.draft.teamNames;
  console.log('teamNames', teamNames);
  return (
    <tr>{
      teamNames
        .map((teamName, index) => {
          return (
            <TeamNameHeader
              draft={props.draft}
              setDraft={props.setDraft}
              teamName={teamName}
              teamIndex={index} />
          );
        })}
    </tr>
  );
};
