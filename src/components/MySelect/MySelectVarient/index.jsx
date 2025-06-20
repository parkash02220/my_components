import React, { useMemo } from "react";
import MySelect from "../MySelect";
import { selectConfig } from "./SelectConfig";

const MySelectVariant = ({
  selectedValue,
  setSelectedValue,
  hookParam,
  type,
  label = "Select",
  multiple = false,
  error,
  helperText,
  disabled = false,
}) => {
  const config = selectConfig[type];
  if (!config) return null;

  const isMultiple = multiple ?? config.multiple ?? false;

  const hookResult = config.useHook(hookParam);
  const selectors = config.selectors(hookResult);

  const handleSelect = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
  };
  const safeValue = useMemo(() => {
    if (!selectors?.options) return isMultiple ? [] : "";

    const optionValues = selectors.options.map((opt) => opt.value);

    if (isMultiple) {
      if (!Array.isArray(selectedValue)) return [];
      return selectedValue.filter((val) => optionValues.includes(val));
    }

    return optionValues.includes(selectedValue) ? selectedValue : "";
  }, [selectedValue, selectors?.options, isMultiple]);

  return (
    <MySelect
      label={label}
      value={safeValue}
      onChange={handleSelect}
      disabled={disabled}
      error={error}
      helperText={helperText}
      multiple={isMultiple}
      loading={selectors.loading}
      options={selectors?.options}
      renderOption={
        config.renderOption
          ? config.renderOption(isMultiple, selectedValue)
          : undefined
      }
      renderValue={config.renderValue}
      loadMoreRef={selectors.loadMoreRef}
      hasMore={selectors.hasMore}
      loadingMore={selectors.loadingMore}
      {...config?.styleProps}
    />
  );
};

export default MySelectVariant;
