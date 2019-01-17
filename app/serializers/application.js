import DS from 'ember-data';
import { merge } from '@ember/polyfills';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  serializeIntoHash(data, type, record, options) {
    merge(data, this.serialize(record, options));
  },
});
