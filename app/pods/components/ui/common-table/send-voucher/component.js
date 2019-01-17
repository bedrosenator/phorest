import Component from '@ember/component';
import EmberObject from '@ember/object';
import { computed } from '@ember/object';
import ENV from 'phorest/config/environment';


export default Component.extend({
  clientsAccounts: computed('column.data.length', function () {
    return this.get('column.data').filterBy('email', this.get('record.email'));
  }),
  multiAccount: false,
  outputDateFormat: ENV.dateFormats.outputFormat,
  inputDateFormat: ENV.dateFormats.inputFormat,
  flatpickrDateFormat: ENV.dateFormats.flatpickrFormat,
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
