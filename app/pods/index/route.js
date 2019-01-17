import Route from '@ember/routing/route';
import ENV from 'phorest/config/environment';
import EmberObject from '@ember/object';
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
    createVoucher(client, voucherFormData, vouchersNumber, closeModalAction, multiAccount) {
      if (!vouchersNumber || vouchersNumber < 1) {
        return;
      }

      let multiClientsIds = [];
      let vouchers = [];
      let voucherData = {};

      if (multiAccount) {
        multiClientsIds = this.get('controller.clients.data')
          .filterBy('email', client.get('email'))
          .map((client) => {
            return client.get('clientId');
          })
      }

      voucherData = EmberObject.create({
        creatingBranchId: client.get('creatingBranchId'),
        clientId: client.get('clientId'),
        originalBalance: voucherFormData.get('originalBalance'),
        remainingBalance: voucherFormData.get('remainingBalance'),
        issueDate: moment(voucherFormData.get('issueDate')['0']).utc().format(),
        expiryDate: moment(voucherFormData.get('expiryDate')['0']).utc().format(),
      });


      if (!multiAccount && multiClientsIds.length < 1) {
        for (let i = 0; i < vouchersNumber; i++) {
          let voucherPromise = this.createVouchersModelPromise(voucherData);
          vouchers.pushObject(voucherPromise);
        }
      }

      if (multiClientsIds.length > 1) {
        for (let i = 0; i < vouchersNumber; i++) {
          for (let j = 0; j < multiClientsIds.length; j++) {
            voucherData.set('clientId', multiClientsIds[j]);
            let voucherPromise = this.createVouchersModelPromise(voucherData);
            vouchers.pushObject(voucherPromise);
          }
        }
      }

      Promise.all(vouchers)
        .then(() => {
          closeModalAction();
        })
    },
  },

  createVouchersModelPromise(voucherData) {
    const voucher = this.get('store').createRecord('voucher', voucherData);
    const voucherPromise = new Promise((resolve) => {
      resolve(voucher.save());
    });

    return voucherPromise;
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
