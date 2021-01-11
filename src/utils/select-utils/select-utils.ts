import * as EnumUtils from '../enum-utils/enum-utils';

interface ReactSelectOption {
  label: string,
  value: string,
  enumMapper?: (enumString: string) => string,
}

/**
 * Converts an object (assumed to be an {@link enum} into a list of options for react-select components.
 * @param enumObject
 * @param enumMapper
 */
export function getAllOptionsForEnum(enumObject: object, enumMapper?: (enumString: any) => string): ReactSelectOption[] {
  return Object
    .keys(enumObject)
    .map(enumKey => toOption(enumKey, enumMapper));
}

export function toOption(arg: any, stringMapper?: (string: any) => string): ReactSelectOption {
  return stringMapper
    ? {label: stringMapper(arg), value: arg}
    : {label: EnumUtils.toNormalCase(arg), value: arg};
}
