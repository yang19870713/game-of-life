const expect = chai.expect;
import Game from "libs/game";

describe('Game', () => {
    it('should return next data when getNext is called', () => {
        let data = [[1,3], [2,1], [2,3], [3,2], [3,3]];
        Game.setData(data);
        expect(Game.getNext()).to.deep.equal([[1,2], [2,3], [2,4], [3,2], [3,3]]);

        data = [[3,2], [3,3], [4,2], [4,3]];
        Game.setData(data);
        expect(Game.getNext()).to.deep.equal(data);
    });
});
