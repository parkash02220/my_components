import React, { useMemo } from "react";
import MySelect from "../MySelect";
import { selectConfig } from "./SelectConfig";

const MySelectVariant = ({
  selectedValue,
  setSelectedValue,
  hookParam,
  type,
  label = "Select",
  multiple=false,
  error,
  helperText,
  disabled=false,
}) => {
  const config = selectConfig[type];
  if (!config) return null;

  const isMultiple = multiple ?? config.multiple ?? false;

  const hookResult = config.useHook(hookParam);
  const selectors = config.selectors(hookResult);

  const handleSelect = (event) => {
    const newValue = event.target.value;
    console.log(":::handle select value",event.target.value)
    setSelectedValue(newValue);
  };
  return (
    <MySelect
      label={label}
      value={selectedValue}
      onChange={handleSelect}
      disabled={disabled}
      error={error}
      helperText={helperText}
      multiple={isMultiple}
      loading={selectors.loading}
      options={selectors?.options}
      renderOption={config.renderOption}
      renderValue={config.renderValue}
      loadMoreRef={selectors.loadMoreRef}
      hasMore={selectors.hasMore}
      loadingMore={selectors.loadingMore}
      {...config?.styleProps}
    />
  );
};

export default MySelectVariant;
