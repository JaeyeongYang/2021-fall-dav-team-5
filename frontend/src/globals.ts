export const BACKEND_DOMAIN = 'http://127.0.0.1:8000';

export const PAGINATION = 100;

export const varsDiscrete = ["way", "pat"];
export const varsContinuous = ["energy", "carb", "protein", "fat", "na", 'ingredients_count'];
export const varsName = varsDiscrete.concat(varsContinuous);

export type VarDiscrete = typeof varsDiscrete[number];
export type VarContinuous = typeof varsContinuous[number];

export type VarName = VarDiscrete | VarContinuous;

export const wayDomain = ['굽기', '끓이기', '볶기', '찌기', '튀기기', '기타'];
export const patDomain = ['국&찌개', '반찬', '밥', '일품', '후식', '기타'];

export const mapVarNameToLabel: { [key: VarName]: string } = {
  way: "조리방법",
  pat: "메뉴종류",
  energy: "열량 (kcal)",
  carb: "탄수화물 (g)",
  protein: "단백질 (g)",
  fat: "지방 (g)",
  na: "나트륨 (g)",
  ingredients_count: '재료 수'
};
