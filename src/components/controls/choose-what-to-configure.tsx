import { ConfigureMode } from '../../entities/draft/configure-mode';
import { Draft } from '../../entities/draft/draft';
import Select, { ValueType } from 'react-select';
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
  console.log('ChooseWhatToConfigure - ', props.draft.configureMode, props.draft);
  return (
    <Select
      options={SelectUtils.getAllOptionsForEnum(ConfigureMode, enumMapper)}
      defaultValue={toOption(props.draft.configureMode)}
      onChange={value => setConfigureMode(value)}
    />
  );

  function toOption(configureMode: ConfigureMode) {
    return SelectUtils.toOption(configureMode, enumMapper);
  }

  function enumMapper(configureMode: ConfigureMode): string {
    switch (configureMode) {
      case ConfigureMode.CONFIGURE_CPU:
        return 'Configure CPU';
      default:
        return EnumUtils.toNormalCase(configureMode);
    }
  }

  function setConfigureMode(option: ValueType<{ label: string; value: string; }, false>): void {
    if (!option) {
      return;
    }
    const newConfigureMode: ConfigureMode = ConfigureMode[option.value as keyof typeof ConfigureMode];
    props.setDraft(
      props
        .draft
        .setConfigureMode(newConfigureMode));
  }
}
