import { Draft } from '../../entities/draft/draft';
import { State } from '../../entities/draft/state';

interface Props {
  draft: Draft,
}

export function DisplayMode(props: Props) {
  return (
    <div id={'draft-mode'}>
      {'Draft state: ' + toNormalCase(props.draft.state)}
    </div>
  );
}

function toNormalCase(draftState: State): string {
  return draftState
    .split('_')
    .map(word => capitalizeFirstLetter(word))
    .join(' ');
}

function capitalizeFirstLetter(word: string): string {
  const array = word.split('');
  array[0] = array[0].toUpperCase();
  for (let i = 1; i < array.length; i += 1) {
    array[i] = array[i].toLowerCase();
  }
  return array.join('');
}
