import * as types from "constants/actions";
import fetch from "isomorphic-fetch";
import {createAction} from "redux-actions";

export const updatePopulation = createAction(types.UPDATE_POPULATION, population => population);
export const selectPreset = createAction(types.SELECT_PRESET, presetName => presetName);
export const loadPresets = createAction(types.LOAD_PRESETS, presets => presets);
