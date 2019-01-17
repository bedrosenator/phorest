import Route from '@ember/routing/route';
import ENV from 'phorest/config/environment';
import moment from 'moment';
import { Promise } from 'rsvp';

export default Route.extend({
  outputDateFormat: ENV.dateFormats.outputFormat,
  inputDateFormat: ENV.dateFormats.inputFormat,
  queryParams: {
    page: {
      refreshModel: true,
    },
    size: {
      refreshModel: true,
    },
    email: {
      refreshModel: true,
    },
    phone: {
      refreshModel: true,
    },
  },

  actions: {
    createVoucher(client, voucherFormData, number, closeModalAction) {
      if (number < 1) {
        return;
      }

      let vouchers = [];
      const voucherData = {
        creatingBranchId: client.get('creatingBranchId'),
        clientId: client.get('clientId'),
        originalBalance: voucherFormData.get('originalBalance'),
        remainingBalance: voucherFormData.get('remainingBalance'),
        issueDate: moment(voucherFormData.get('issueDate')['0']).utc().format(),
        expiryDate: moment(voucherFormData.get('expiryDate')['0']).utc().format(),
      };

      for (let i = 0; i < number; i++) {
        const voucher = this.get('store').createRecord('voucher', voucherData);
        const voucherPromise = new Promise((resolve) => {
          resolve(voucher.save());
        });
        vouchers.pushObject(voucherPromise);
      }

      Promise.all(vouchers)
        .then(() => {
          closeModalAction();
        })
    },
  },

  model(params) {
    const queryParams = {
      size: params.size,
      page: params.page,
      email: params.email,
      phone: params.phone,
    };

    if (!queryParams.email) {
      delete queryParams.email;
    }

    if (!queryParams.phone) {
      delete queryParams.phone;
    }

    if (queryParams.phone || queryParams.email) {
      queryParams.page = 0;
    }

    return this.get('store')
      .query('client', queryParams)
      .then(clients => {
        return {
          data: clients,
          meta: clients.get('meta'),
        };
      })
  },

  setupController (controller, model) {
    controller.set('clients', model);
  },

});
