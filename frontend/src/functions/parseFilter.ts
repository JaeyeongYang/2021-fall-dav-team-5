import { FilterState, SearchTermType } from "src/store/reducers/filter";

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
  const { terms, way, pat, hashtag, ...rest } = state;

  const name = terms?.filter((x) => x.type == SearchTermType.menu).map((x) => x.name)
  const ing_set_inc = terms?.filter((x) => (x.type == SearchTermType.ingredient) && x.isParsed && !x.excluded).map((x) => x.name)
  const ing_set_exc = terms?.filter((x) => (x.type == SearchTermType.ingredient) && x.isParsed && x.excluded).map((x) => x.name)
  const ing_str_inc = terms?.filter((x) => (x.type == SearchTermType.ingredient) && !x.isParsed && !x.excluded).map((x) => x.name)
  const ing_str_exc = terms?.filter((x) => (x.type == SearchTermType.ingredient) && !x.isParsed && x.excluded).map((x) => x.name)

  let ret: FilterQuery = rest

  if (name && name.length > 0) ret = { ...ret, name: name.join(',') };
  if (way && way.length > 0) ret = { ...ret, way: way.join(',') };
  if (pat && pat.length > 0) ret = { ...ret, pat: pat.join(',') };
  if (hashtag && hashtag.length > 0) ret = { ...ret, hashtags: hashtag.join(',') };

  if (ing_set_inc && ing_set_inc.length > 0) ret = { ...ret, ingredients_set_inc: ing_set_inc.join(',') };
  if (ing_set_exc && ing_set_exc.length > 0) ret = { ...ret, ingredients_set_exc: ing_set_exc.join(',') };
  if (ing_str_inc && ing_str_inc.length > 0) ret = { ...ret, ingredients_inc: ing_str_inc.join(',') };
  if (ing_str_exc && ing_str_exc.length > 0) ret = { ...ret, ingredients_exc: ing_str_exc.join(',') };

  return ret;
};

export default parseFilter;