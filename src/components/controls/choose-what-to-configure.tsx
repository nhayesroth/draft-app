import { ConfigureMode } from '../../entities/draft/configure-mode';
import { Draft } from '../../entities/draft/draft';
import Select from 'react-select';
import * as SelectUtils from '../../utils/select-utils/select-utils';
import * as EnumUtils from '../../utils/enum-utils/enum-utils';

export interface Props {
  draft: Draft,
  setDraft: (draft: Draft) => void,
}

export function ChooseWhatToConfigure(
  props: {
    draft: Draft,
    setDraft: (draft: Draft) => void
  }) {
  return (
    <Select
      options={SelectUtils.getAllOptionsForEnum(ConfigureMode, enumMapper)}
      defaultValue={toOption(ConfigureMode.ASSIGN_PICKS)}
    />
  );

  function toOption(configureMode: ConfigureMode) {
    return SelectUtils.toOption(configureMode, enumMapper);
  }

  function enumMapper(configureMode: ConfigureMode) {
    switch (configureMode) {
      case ConfigureMode.CONFIGURE_CPU:
        return 'Configure CPU';
      default:
        return EnumUtils.toNormalCase(configureMode);
    }
  }
}
