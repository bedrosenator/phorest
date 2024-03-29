import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import registerFlatpickrHelpers from 'ember-flatpickr/test-support/helpers';

registerFlatpickrHelpers();

setApplication(Application.create(config.APP));

start();
