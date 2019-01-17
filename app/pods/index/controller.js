import Controller from '@ember/controller';
import { A } from '@ember/array'

export default Controller.extend({
  isModalVisible: false,
  clientsTableColumns: A([
    {
      component: 'ui/common-table/send-voucher',
      propertyName: 'send voucher',
    },
    {
      propertyName: 'clientSince',
      component: 'ui/common-table/date-formatted',
    },
    {
      propertyName: 'address',
      isVisible: false,
    },
    {
      propertyName: 'clientId',
      isVisible: true,
    },
    {
      propertyName: 'archived',
      component: 'ui/common-table/check-box',
      isVisible: false,
    },
    {
      propertyName: 'banned',
      component: 'ui/common-table/check-box'
    },
    {
      propertyName: 'birthDate',
    },
    {
      propertyName: 'creatingBranchId',
    },
    {
      propertyName: 'creditAccount',
      isVisible: false,
    },
    {
      propertyName: 'email',
    },
    {
      propertyName: 'emailMarketingConsent',
      component: 'ui/common-table/check-box',
      isVisible: false,
    },
    {
      propertyName: 'Email Reminder Consent',
      isVisible: false,
    },
    {
      propertyName: 'firstName',
    },
    {
      propertyName: 'lastName',
    },
    {
      propertyName: 'landLine',
    },
    {
      propertyName: 'gender',
    },
    {
      propertyName: 'links',
      isVisible: false,
    },
    {
      propertyName: 'mobile',
    },
    {
      propertyName: 'notes',
    },
    {
      propertyName: 'photoUrl',
    },
    {
      propertyName: 'preferredStaffId',
      isVisible: false,
    },
    {
      propertyName: 'smsReminderConsent',
      component: 'ui/common-table/check-box',
    },
    {
      propertyName: 'smsMarketingConsent',
      component: 'ui/common-table/check-box',
    },
    {
      propertyName: 'version',
    },
  ]),
  queryParams: [
    'page',
    'size',
    'email',
    'phone',
  ],
  page: 1,
  size: 10,
  email: '',
  phone: '',
  metaItemsCountProperty: 'totalElements',
  metaPagesCountProperty: 'totalPages',
  pageSize: 10,
  pageSizeValues: A([10, 20, 30]),

});
