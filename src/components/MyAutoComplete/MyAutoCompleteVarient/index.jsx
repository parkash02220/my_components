import { getFullName } from "@/utils";
import { useMemo } from "react";
import MyAutoComplete from "../MyAutoComplete";
import { autocompleteConfigMap } from "./AutoCompleteConfig";

const MyAutoCompleteVarient = ({ selectedOptions, setSelectedOptions, type,label='Select options' }) => {
  const config = autocompleteConfigMap[type];
  if (!config) return null;

  const hookResult = config.useHook();
  const selectors = config.selectors(hookResult);

  const filteredOptions = useMemo(() => {
    return config.getFilteredOptions?.(hookResult, selectedOptions) || [];
  }, [hookResult, selectedOptions, config]);

  const handleOptionSelect = (_, newValue) => {
    setSelectedOptions(newValue);
    selectors?.refetchOptions?.();
  };

  const handleSearch = (event) => {
    selectors.handleSearchValueChange?.(event);
  };

  const handleAutoCompleteClose = () => {
    selectors.setSearchValue?.("");
  };

  return (
    <MyAutoComplete
      fullWidth
      multiple
      value={selectedOptions}
      loading={selectors.loading || !selectors.hasFetchedOnce}
      options={filteredOptions}
      filterOptions={(options) => options}
      getOptionLabel={(option) => getFullName(option?.firstName, option?.lastName)}
      renderOption={config.renderOption}
      renderTags={config.renderTags}
      onChange={handleOptionSelect}
      onInputChange={handleSearch}
      loadMoreRef={selectors.loadMoreRef}
      hasMore={selectors.hasMore}
      loadingMore={selectors.loadingMore}
      label={label}
      fontSize={14}
      labelFontSize={14}
      onClose={handleAutoCompleteClose}
      borderColor="#ccc"
      hoverBorderColor="#1C252E"
      focusedBorder="2px solid #1C252E"
    />
  );
};

export default MyAutoCompleteVarient;
