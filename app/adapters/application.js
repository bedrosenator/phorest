import DS from 'ember-data';
import { computed } from '@ember/object';
import BuildURLMixin from 'ember-data';
import ENV from 'phorest/config/environment';

export default DS.RESTAdapter.extend(BuildURLMixin, {
  namespace: ENV.apiNamespace,
  host: `${ENV.apiHost}${ENV.businessId}`,
  headers: computed('session.data.authenticated.token', function () {
    const token = 'Z2xvYmFsL2Nsb3VkQGFwaWV4YW1wbGVzLmNvbTpWTWxSby9laCtYZDhNfmw=';
    const headers = {
      AUTHORIZATION: `Basic ${token}`,
    };

    return headers;
  }),
  pathForType: function(type) {
    return type;
  }
});
