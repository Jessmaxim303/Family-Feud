const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

import Game from '../src/game';

describe('Game', () => {
  it('should be a function', () => {
    const game = new Game();

    expect(Game).to.be.a('function');
  })

  it('should be an instance of Game', () => {
    const game = new Game();

    expect(game).to.be.an.instanceof(Game);
  })

  it('should start roundCount at 0', () => {
    const game = new Game();

    expect(game.roundCount).to.equal(0);
  })

  it('should start scoreboard as an empty array', () => {
    const game = new Game();

    expect(game.scoreboard).to.deep.equal([]);
  })

  it('should with player1 as an object', () => {
    const game = new Game();

    expect(game.player1).to.deep.equal({});
  })

  it('should with player2 as an object', () => {
    const game = new Game();

    expect(game.player2).to.deep.equal({});
  })

  it('should start with round as an object', () => {
    const game = new Game();

    expect(game.round).to.deep.equal({});
  })

  it('Should save to local storage', () => {
      const game = new Game();
      game.saveToLocal();
      chai.spy.on(game.saveToLocal,['setItem', 'getItem'], () => {});
      expect(game.saveToLocal).to.have.been.called(1);
  });

  describe('createPlayers', () => {
    it('should be a function', () => {
      const game = new Game();

      expect(game.createPlayers).to.be.a('function');
    })
  })


});
