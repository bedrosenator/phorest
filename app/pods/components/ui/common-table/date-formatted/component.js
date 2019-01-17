import Component from '@ember/component';
import ENV from 'phorest/config/environment';

export default Component.extend({
  outputDateFormat: ENV.dateFormats.outputFormat,
  inputDateFormat: ENV.dateFormats.inputFormat,
});
