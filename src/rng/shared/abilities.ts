import { random, sum } from 'lodash/fp';
import { Big, Small } from 'types/character';

type Ability = {
  name: string;
  score: number;
};

type Abilities = {
  strength: Ability;
  agility: Ability;
  presence: Ability;
  toughness: Ability;
};

export const threeD6 = (modifier: number) => {
  const rolls = [random(1, 6), random(1, 6), random(1, 6)];
  const result = sum(rolls) + modifier;

  return scores.find(({ numbers }) => numbers.includes(result))?.value || 0;
};

export const scores = [
  { value: -3, numbers: [1, 2, 3, 4] },
  { value: -2, numbers: [5, 6] },
  { value: -1, numbers: [7, 8] },
  { value: 0, numbers: [9, 10, 11, 12] },
  { value: 1, numbers: [13, 14] },
  { value: 2, numbers: [15, 16] },
  { value: 3, numbers: [17, 18, 19, 20] },
];

const formatScore = (score: number) => {
  if (score < 0) {
    return `${score}`;
  }
  if (score > 0) {
    return `+${score}`;
  }
  return `±${score}`;
};

export const formatAbility = ({ name, score }: Ability): Small => ({
  tags: ['ability', name],
  title: { id: `character.stats.titles.${name}`, values: {} },
  description: {
    id: `character.stats.standard.ability`,
    values: { ability: formatScore(score) },
  },
});

export const rollAbilities = (strMod: number, agiMod: number, preMod: number, touMod: number): Abilities => ({
  strength: {
    name: 'strength',
    score: threeD6(strMod),
  },
  agility: {
    name: 'agility',
    score: threeD6(agiMod),
  },
  presence: {
    name: 'presence',
    score: threeD6(preMod),
  },
  toughness: {
    name: 'toughness',
    score: threeD6(touMod),
  }
});

export const formatAbilities = (abilities: Abilities): Big => ({
  component: { id: 'abilityList' },
  header: { id: 'character.stats.titles.abilities', values: {} },
  content: [
    formatAbility(abilities.strength),
    formatAbility(abilities.agility),
    formatAbility(abilities.presence),
    formatAbility(abilities.toughness),
  ],
});
