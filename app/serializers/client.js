import ApplicationSerializer from './application';

export default ApplicationSerializer.extend( {
  primaryKey: 'clientId',
  attrs: {
    address: {
      embedded: 'always',
    },
    creditAccount: {
      embedded: 'always',
    },
    links: {
      embedded: 'always',
    }
  },

  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    let clients = [];

    if (payload._embedded && payload._embedded.clients) {
      clients = payload._embedded.clients;
    }

    let response = {
      clients,
      meta: payload.page,
    };

    return this._super(store, primaryModelClass, response, id, requestType)
  },

});
