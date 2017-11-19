import actions from '../../../../src/vuex/actions'
import { POPULATE_SHOPPING_LISTS, CHANGE_TITLE } from '../../../../src/vuex/mutation_types'

describe('actions.js', () => {
  var server, store, lists, successPut, successPost, successDelete

  successDelete = {'delete': true}
  successPut = {'put': true}
  successPost = {'post': true}

  beforeEach(() => {
    // mock shopping lists
    lists = [{
      id: '1',
      title: 'Groceries'
    }, {
      id: '2',
      title: 'Clothes'
    }]

    // mock store
    store = {
      commit: (method, data) => {},
      dispatch: () => {
        return Promise.resolve()
      },
      state: {
        shoppinglists: lists
      }
    }

    sinon.stub(store, 'commit')

    server = sinon.fakeServer.create()
    server.respondWith('GET', /shoppinglists/, xhr => {
      xhr.respond(200, {'Content-Type': 'application/json'}, JSON.stringify(lists))
    })

    server.respondWith('POST', /shoppinglists/, xhr => {
      xhr.respond(200, {'Content-Type': 'application/json'}, JSON.stringify(successPost))
    })

    server.respondWith('PUT', /shoppinglists/, xhr => {
      xhr.respond(200, {'Content-Type': 'application/json'}, JSON.stringify(successPut))
    })

    server.respondWith('DELETE', /shoppinglists/, xhr => {
      xhr.respond(200, {'Content-Type': 'application/json'}, JSON.stringify(successDelete))
    })

    server.autoRespond = true
  })

  afterEach(() => {
    store.commit.restore()
    server.restore()
  })

  describe('populateShoppingLists', () => {
    it('should call commit method with POPULATE_SHOPPING_LISTS string parameter', done => {
      actions.populateShoppingLists(store).then(() => {
        expect(store.commit).to.have.been.calledWith(POPULATE_SHOPPING_LISTS, lists)
        done()
      }).catch(done)
    })
  })

  describe('changeTitle', () => {
    it('should call commit method with CHANGE_TITLE string', (done) => {
      let title = 'new title'

      actions.changeTitle(store, {title: title, id: '1'}).then(() => {
        expect(store.commit).to.have.been.calledWith(CHANGE_TITLE, {title: title, id: '1'})
        done()
      }).catch(done)
    })
  })

  describe('updateList', () => {
    it('should return sucessful PUT response', (done) => {
      actions.updateList(store, '1').then((data) => {
        expect(data.data).to.eql(successPut)
        done()
      }).catch(done)
    })
  })
})
