import Component from '@ember/component';
import EmberObject from '@ember/object';
import { computed } from '@ember/object';

export default Component.extend({
  clientsAccounts: computed('column.data.length', function () {
    return this.get('column.data').filterBy('email', this.get('record.email'));
  }),
  multiAccount: false,
  isModalVisible: false,
  voucher: EmberObject.create({
    originalBalance: '',
    remainingBalance: '',
    issueDate: '',
    expiryDate: '',
  }),
  actions: {
    showSendVoucherModal() {
      this.toggleProperty('isModalVisible')
    },
  },

});
