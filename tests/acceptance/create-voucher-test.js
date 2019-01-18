import { module, test } from 'qunit';
import { visit, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setFlatpickrDate } from 'ember-flatpickr/test-support/helpers';
import $ from 'jquery';

module('Acceptance | create voucher', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function (/* assert */) {
    this.set('emailSearchInput', '.clients-header__email-input');
    this.set('phoneSearchInput', '.clients-header__phone-input');
    this.set('clientsTable', '.clients-table');
    this.set('voucherModal', '.voucher-modal .modal-dialog');
    this.set('vouchersNumber', '.voucher-modal__vouchers-number-input');
    this.set('closeModalBtn', '.voucher-modal__close-voucher-modal-button');
    this.set('createVoucherBtn', '.voucher-modal__create-voucher-button');
    this.set('origBalanceInput', '.voucher-modal__orig-balance-input');
    this.set('remainingBalanceInput', '.voucher-modal__remaining-balance-input');
    this.set('issueDateInput', '.voucher-modal__issue-date-input');
    this.set('expiryDateInput', '.voucher-modal__expiry-date-input');
  });

  test('Search test', async function(assert) {
    await visit('/');

    await fillIn(this.get('emailSearchInput'), 'test@phorest.com');
    assert.ok($(this.get('clientsTable')).find('tbody tr').length, 2, "There are 2 clients with test@phorest email");
  });

  test('Test fill in form', async function (assert) {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    await visit('/');
    await click(`${this.get('clientsTable')} tbody tr:first-child button`);
    assert.ok($(this.get('voucherModal')).length, 'Modal opened');

    await fillIn(this.get('vouchersNumber'), 2);
    assert.equal($(this.get('vouchersNumber')).val(), 2, 'Vouchers number set to 2');

    await fillIn(this.get('origBalanceInput'), 20);
    assert.equal($(this.get('origBalanceInput')).val(), 20, 'Original balance set to 20');

    await fillIn(this.get('remainingBalanceInput'), 30);
    assert.equal($(this.get('remainingBalanceInput')).val(), 30, 'Remaining balance set to 30');

    setFlatpickrDate(this.get('issueDateInput'), today);
    setFlatpickrDate(this.get('expiryDateInput'), tomorrow);

    await click(this.get('createVoucherBtn'));
    assert.notOk($(this.get('voucherModal')).length, 'Modal was closed and form was sent successfully');
  });
});
