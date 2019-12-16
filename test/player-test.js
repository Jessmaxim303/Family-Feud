const chai = require('chai');
const expect = chai.expect;

import Player from '../src/player';

describe('Player', () => {
  it('should be a function', () => {
    const player = new Player();

    expect(Player).to.be.a('function');
  })

  it('should be an instance of Game', () => {
    const player = new Player();

    expect(player).to.be.an.instanceof(Player);
  })

  it('should be able to have a name', () => {
    const player = new Player('Karen');

    expect(player.name).to.equal('Karen');
  })

  it('should start with a score of 0', () => {
    const player = new Player('Karen');

    expect(player.score).to.equal(0);
  })

  it('should start with turnActive as false', () => {
    const player = new Player('Karen');

    expect(player.turnActive).to.equal(false);
  })
});
