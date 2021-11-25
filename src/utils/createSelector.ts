import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "lodash/isEqual";

const createSelector = createSelectorCreator(defaultMemoize, {
  equalityCheck: isEqual,
  resultEqualityCheck: isEqual,
  maxSize: 32,
});

export default createSelector;
