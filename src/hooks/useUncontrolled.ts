// Вдохновлялся: https://github.com/jquense/uncontrollable/blob/master/src/hook.tsx

import { useState, useCallback } from "react";
import capitalize from "utils/capitalize";

type Fields<FieldNames extends {}> = {
  [Key in keyof FieldNames]: FieldNames[Key]
}

const useUncontrolled = <TProps extends {}, TFields extends {}>(
  props: TProps,
  fieldName: string,
  handlerName: string,
  defaultValue?: unknown
) => {
  const propDefaultValueKey = `default${capitalize(fieldName)}`;
  const {
    [fieldName]: propValue,
    [handlerName]: propHandler,
    [propDefaultValueKey]: propDefaultValue,
    ...restProps
  } = props as any;

  const [stateValue, setStateValue] = useState(
    propDefaultValueKey in props ? propDefaultValue : defaultValue
  );

  return {
    ...restProps,
    [fieldName]: fieldName in props ? propValue : stateValue,
    [handlerName]: useCallback(
      (value: string, ...args: unknown[]) => {
        typeof propHandler === "function" && propHandler(value, ...args);
        setStateValue(value);
      },
      [propHandler]
    ),
  } as Fields<TFields> & Exclude<TProps, keyof TFields>;
};

export default useUncontrolled;
