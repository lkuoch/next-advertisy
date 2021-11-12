import { createSelectorCreator, defaultMemoize } from "reselect";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const createSelector = createSelectorCreator(defaultMemoize, {
  maxSize: publicRuntimeConfig.vars.selector_options,
});

export default createSelector;
