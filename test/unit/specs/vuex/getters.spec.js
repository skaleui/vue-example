import getters from '../../../../src/vuex/getters'

describe('getters.js', () => {
  var state, lists

  beforeEach(() => {
    lists = [{id: '1', title: 'Groceries'}, {id: '2', title: 'clothes'}]
    state = {
      shoppinglists: lists
    }
  })

  describe('getlists', () => {
    it('should return lists', () => {
      expect(getters.getLists(state)).to.eql(lists)
    })
  })

  describe('getListById', () => {
    it('should return shopping list object by its id', () => {
      expect(getters.getListById(state, '1')).to.eql({id: '1', title: 'Groceries'})
    })

    it('should not return anything if passed id is not in the list', () => {
      expect(getters.getListById(state, 'notexisting')).to.be.empty
    })
  })
})
