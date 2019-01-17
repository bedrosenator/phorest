import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  clientId: DS.attr('string'),
  voucherId: DS.attr('string'),
  creatingBranchId: DS.attr('string'),
  expiryDate: DS.attr('string', { defaultValue: moment().format() }),
  issueDate: DS.attr('string', { defaultValue: moment().add(1, 'day').format() }),
  links: DS.attr(),
  originalBalance: DS.attr('number', { defaultValue: 100 }),
  remainingBalance: DS.attr('number', { defaultValue: 100 }),
  serialNumber: DS.attr('string'),
});
