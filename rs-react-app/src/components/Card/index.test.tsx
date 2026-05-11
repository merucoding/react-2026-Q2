import type { Pokemon } from 'pokeapi-typescript';
import { render, screen } from '@testing-library/react';
import Card from './';
import { DC_TO_CM } from '../../shared/constants/math';
import { MOCK_PIKACHU_DATA } from '../../test-utils/mocks/handlers/pokemonMocks';

describe('Card component', () => {
  it('displays pokemon name and description correctly', () => {
    render(<Card pokemon={MOCK_PIKACHU_DATA as Pokemon} />);

    const image = screen.getByRole('img');

    expect(screen.getByText(MOCK_PIKACHU_DATA.name)).toBeInTheDocument();
    expect(
      screen.getByText(
        `height: ${MOCK_PIKACHU_DATA.height * DC_TO_CM} cm, weight: ${MOCK_PIKACHU_DATA.weight / DC_TO_CM} kg`
      )
    ).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      MOCK_PIKACHU_DATA.sprites.front_default
    );
    expect(image).toHaveAttribute('alt', 'picture');
  });
});
