import { FilterState } from "src/store/reducers/filter";

export interface FilterQuery {
  name?: string;
  way?: string;
  pat?: string;
  energy_min?: number;
  energy_max?: number;
  carb_min?: number;
  carb_max?: number;
  protein_min?: number;
  protein_max?: number;
  fat_min?: number;
  fat_max?: number;
  na_min?: number;
  na_max?: number;
  hashtags?: string;
  ingredients_set_inc?: string;
  ingredients_set_exc?: string;
  ingredients_inc?: string;
  ingredients_exc?: string;
}

const parseFilter = (state: FilterState) => {
  const { name, way, pat, hashtag, ingredients, ...rest } = state;

  const ingredients_set_inc = ingredients?.filter((x) => x.isParsed && !x.excluded).map((x) => x.name)
  const ingredients_set_exc = ingredients?.filter((x) => x.isParsed && x.excluded).map((x) => x.name)
  const ingredients_inc = ingredients?.filter((x) => !x.isParsed && !x.excluded).map((x) => x.name)
  const ingredients_exc = ingredients?.filter((x) => !x.isParsed && x.excluded).map((x) => x.name)

  let ret: FilterQuery = rest
  if (name && name.length > 0) ret = { ...ret, name: name.join(',') };
  if (way && way.length > 0) ret = { ...ret, way: way.join(',') };
  if (pat && pat.length > 0) ret = { ...ret, pat: pat.join(',') };
  if (hashtag && hashtag.length > 0) ret = { ...ret, hashtags: hashtag.join(',') };

  if (ingredients_set_inc && ingredients_set_inc.length > 0) ret = { ...ret, ingredients_set_inc: ingredients_set_inc.join(',') };
  if (ingredients_set_exc && ingredients_set_exc.length > 0) ret = { ...ret, ingredients_set_exc: ingredients_set_exc.join(',') };
  if (ingredients_inc && ingredients_inc.length > 0) ret = { ...ret, ingredients_inc: ingredients_inc.join(',') };
  if (ingredients_exc && ingredients_exc.length > 0) ret = { ...ret, ingredients_exc: ingredients_exc.join(',') };

  return ret;
};

export default parseFilter;