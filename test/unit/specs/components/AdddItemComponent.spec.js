import Vue from 'vue'
import AddItemComponent from '../../../..//src/components/AddItemComponent'
import store from '../../../../src/vuex/store'

describe('AddItemComponent.vue', () => {
  describe('initialization', () => {
    it('should initialize the compoent with empty string new Item', () => {
      expect(AddItemComponent.data()).to.eql({newItem: ''})
    })
  })

  describe('addItem', () => {
    var component

    beforeEach(() => {
      var vm = new Vue({
        template: '<add-item-component :items="items" :id="id" ref="additemcomponent">' +
        '</add-item-component>',
        components: {
          AddItemComponent
        },
        data () {
          return {

            items: [],
            id: 'newId'
          }
        },
        store
      }).$mount()

      component = vm.$refs.additemcomponent
    })

    it('should call $emit method', () => {
      let newItem = 'Learning Vue JS'

      sinon.stub(component, '$emit')

      sinon.stub(store, 'dispatch')

      component.newItem = newItem
      component.addItem()

      expect(component.newItem).to.eql('')
      expect(component.$emit).to.have.been.calledWith('add', newItem)
      expect(store.dispatch).to.have.been.calledWith('updateList', 'newId')
      store.dispatch.restore()
      component.$emit.restore()
    })
  })
})

