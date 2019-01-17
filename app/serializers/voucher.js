import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  primaryKey: 'voucherId',
  attrs: {
    links: {
      embedded: 'always',
    }
  },
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    return this._super(store, primaryModelClass, { [primaryModelClass.modelName]: payload }, id, requestType);
  }
});
