import { DC_TO_CM } from '../shared/constants/math';

export default function getPokemonParams(
  height: number,
  weight: number
): string {
  return `height: ${height * DC_TO_CM} cm, weight: ${weight / DC_TO_CM} kg`;
}
