const chai = require('chai');
const expect = chai.expect;

import Round from '../src/round';
import Player from '../src/player';
import data from '../src/game-data';

describe('Round', () => {
  it('should be a function', () => {
    const round = new Round(data.surveys[0], new Player('a'), new Player('b'));

    expect(Round).to.be.a('function');
  });

  it('should be an instance of Round', () => {
    const round = new Round(data.surveys[0], new Player('a'), new Player('b'));

    expect(round).to.be.an.instanceof(Round);
  });
});
