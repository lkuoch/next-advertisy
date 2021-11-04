import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "lodash/isEqual";

export const createSelector = createSelectorCreator(defaultMemoize, isEqual);
