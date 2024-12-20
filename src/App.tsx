import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

interface FilterParams<T> {
  sort: keyof T | '';
  reversed: boolean;
}

function getPrepearedGoods<T>(
  goods: string[],
  { sort, reversed }: FilterParams<T>,
): string[] {
  const preparedGoods = [...goods];

  if (sort) {
    preparedGoods.sort((goods1, goods2) => {
      switch (sort) {
        case SORT_FIELD_ALPHABET:
          return goods1.localeCompare(goods2);
        case SORT_FIELD_LENGTH:
          return goods1.length - goods2.length;
        default:
          return 0;
      }
    });

    if (reversed) {
      return preparedGoods.reverse();
    }
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sort, setSort] = useState('');
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getPrepearedGoods(goodsFromServer, {
    sort,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sort !== SORT_FIELD_ALPHABET,
          })}
          onClick={() => setSort(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sort !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSort(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': reversed !== false,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sort !== '' || reversed !== false) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSort('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
