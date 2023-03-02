import { Summary } from 'N/search';

export const getElementValue = (
  id: string,
  elements: NsReactElementValue[]
): string | number | boolean | NsReactSelectOption | null => {
  const matchIndex: number = elements.findIndex(e => e.id === id);
  if (matchIndex > -1) {
    return elements[matchIndex].value ? elements[matchIndex].value : null;
  }
  return null;
};

export enum NsQueryTransactionType {
  BlankOrd = 'Blanket Purchase Order',
  CashSale = 'Cash Sale',
  Check = 'Check',
  Commissn = 'Commission',
  CustChrg = 'Statement Charge',
  CustCred = 'Credit Memo',
  CustDep = 'Customer Deposit',
  CustInvc = 'Invoice',
  CustPymt = 'Payment',
  CustRfnd = 'Customer Refund',
  DeprCust = 'Deprecated Custom Transaction',
  Estimate = 'Quote',
  ExpRept = 'Expense Report',
  InvCount = 'Inventory Count',
  ItemShip = 'Item Fulfillment',
  Journal = 'Journal',
  LiabPymt = 'Payroll Liability Check',
  Opprtnty = 'Opportunity',
  Paycheck = 'Paycheck',
  PurchCon = 'Purchase Contract',
  PurchOrd = 'Purchase Order',
  PurchReq = 'Requisition',
  RevArrng = 'Revenue Arrangement',
  Rfq = 'Request For Quote',
  RtnAuth = 'Return Authorization',
  SalesOrd = 'Order',
  StPickUp = 'Store Pickup Fulfillment',
  TaxLiab = 'Tax Liability Cheque',
  TaxPymt = 'Sales Tax Payment',
  TegPybl = 'Tegata Payable',
  TegRcvbl = 'Tegata Receivables',
  TrnfrOrd = 'Transfer Order',
  VendAuth = 'Vendor Return Authorization',
  VendBill = 'Bill',
  VendPymt = 'Bill Payment',
  VendRfq = 'Vendor Request For Quote',
  WorkOrd = 'Work Order',
}
export enum NsQueryTransactionStatus {
  'VendBill:A' = 'Bill:Open',
  'VendBill:B' = 'Bill:Paid In Full',
  'VendBill:C' = 'Bill:Cancelled',
  'VendBill:D' = 'Bill:Pending Approval',
  'VendBill:E' = 'Bill:Rejected',
  'VendPymt:V' = 'Bill Payment:Voided',
  'VendPymt:Z' = 'Bill Payment:Online Bill Pay Pending Accounting Approval',
  'BlankOrd:A' = 'Blanket Purchase Order:Pending Approval',
  'BlankOrd:B' = 'Blanket Purchase Order:Approved',
  'BlankOrd:H' = 'Blanket Purchase Order:Closed',
  'BlankOrd:R' = 'Blanket Purchase Order:Rejected',
  'CashSale:A' = 'Cash Sale:Unapproved Payment',
  'CashSale:B' = 'Cash Sale:Not Deposited',
  'CashSale:C' = 'Cash Sale:Deposited',
  'Check:V' = 'Check:Voided',
  'Check:Z' = 'Check:Online Bill Pay Pending Accounting Approval',
  'Commissn:A' = 'Commission:Pending Payment',
  'Commissn:O' = 'Commission:Overpaid',
  'Commissn:P' = 'Commission:Pending Accounting Approval',
  'Commissn:R' = 'Commission:Rejected by Accounting',
  'Commissn:X' = 'Commission:Paid in Full',
  'CustCred:A' = 'Credit Memo:Open',
  'CustCred:B' = 'Credit Memo:Fully Applied',
  'CustCred:V' = 'Credit Memo:Voided',
  'CustDep:A' = 'Customer Deposit:Not Deposited',
  'CustDep:B' = 'Customer Deposit:Deposited',
  'CustDep:C' = 'Customer Deposit:Fully Applied',
  'CustRfnd:V' = 'Customer Refund:Voided',
  'DeprCust:A' = 'Deprecated Custom Transaction:Status A',
  'DeprCust:B' = 'Deprecated Custom Transaction:Status B',
  'DeprCust:C' = 'Deprecated Custom Transaction:Status C',
  'DeprCust:D' = 'Deprecated Custom Transaction:Status D',
  'DeprCust:E' = 'Deprecated Custom Transaction:Status E',
  'DeprCust:F' = 'Deprecated Custom Transaction:Status F',
  'DeprCust:G' = 'Deprecated Custom Transaction:Status G',
  'DeprCust:H' = 'Deprecated Custom Transaction:Status H',
  'DeprCust:I' = 'Deprecated Custom Transaction:Status I',
  'DeprCust:J' = 'Deprecated Custom Transaction:Status J',
  'DeprCust:K' = 'Deprecated Custom Transaction:Status K',
  'DeprCust:L' = 'Deprecated Custom Transaction:Status L',
  'DeprCust:M' = 'Deprecated Custom Transaction:Status M',
  'DeprCust:N' = 'Deprecated Custom Transaction:Status N',
  'DeprCust:O' = 'Deprecated Custom Transaction:Status O',
  'DeprCust:P' = 'Deprecated Custom Transaction:Status P',
  'DeprCust:Q' = 'Deprecated Custom Transaction:Status Q',
  'DeprCust:R' = 'Deprecated Custom Transaction:Status R',
  'DeprCust:S' = 'Deprecated Custom Transaction:Status S',
  'DeprCust:T' = 'Deprecated Custom Transaction:Status T',
  'DeprCust:U' = 'Deprecated Custom Transaction:Status U',
  'DeprCust:V' = 'Deprecated Custom Transaction:Voided',
  'DeprCust:W' = 'Deprecated Custom Transaction:Status W',
  'DeprCust:X' = 'Deprecated Custom Transaction:Status X',
  'DeprCust:Z' = 'Deprecated Custom Transaction:Status Z',
  'ExpRept:A' = 'Expense Report:In Progress',
  'ExpRept:B' = 'Expense Report:Pending Supervisor Approval',
  'ExpRept:C' = 'Expense Report:Pending Accounting Approval',
  'ExpRept:D' = 'Expense Report:Rejected by Supervisor',
  'ExpRept:E' = 'Expense Report:Rejected by Accounting',
  'ExpRept:F' = 'Expense Report:Approved by Accounting',
  'ExpRept:G' = 'Expense Report:Approved (Overridden) by Accounting',
  'ExpRept:H' = 'Expense Report:Rejected (Overridden) by Accounting',
  'ExpRept:I' = 'Expense Report:Paid In Full',
  'InvCount:A' = 'Inventory Count:Open',
  'InvCount:B' = 'Inventory Count:Started',
  'InvCount:C' = 'Inventory Count:Completed/Pending Approval',
  'InvCount:D' = 'Inventory Count:Approved',
  'CustInvc:A' = 'Invoice:Open',
  'CustInvc:B' = 'Invoice:Paid In Full',
  'CustInvc:D' = 'Invoice:Pending Approval',
  'CustInvc:E' = 'Invoice:Rejected',
  'ItemShip:A' = 'Item Fulfillment:Picked',
  'ItemShip:B' = 'Item Fulfillment:Packed',
  'ItemShip:C' = 'Item Fulfillment:Shipped',
  'Journal:A' = 'Journal:Pending Approval',
  'Journal:B' = 'Journal:Approved for Posting',
  'Opprtnty:A' = 'Opportunity:In Progress',
  'Opprtnty:B' = 'Opportunity:Issued Estimate',
  'Opprtnty:C' = 'Opportunity:Closed - Won',
  'Opprtnty:D' = 'Opportunity:Closed - Lost',
  'SalesOrd:A' = 'Order:Pending Approval',
  'SalesOrd:B' = 'Order:Pending Fulfillment',
  'SalesOrd:C' = 'Order:Cancelled',
  'SalesOrd:D' = 'Order:Partially Fulfilled',
  'SalesOrd:E' = 'Order:Pending Billing/Partially Fulfilled',
  'SalesOrd:F' = 'Order:Pending Billing',
  'SalesOrd:G' = 'Order:Billed',
  'SalesOrd:H' = 'Order:Closed',
  'Paycheck:A' = 'Paycheck:Created',
  'Paycheck:C' = 'Paycheck:Pending Tax Calculation',
  'Paycheck:D' = 'Paycheck:Pending Commitment',
  'Paycheck:F' = 'Paycheck:Committed',
  'Paycheck:P' = 'Paycheck:Preview',
  'Paycheck:R' = 'Paycheck:Reversed',
  'Paycheck:X' = 'Paycheck:Error',
  'CustPymt:A' = 'Payment:Unapproved Payment',
  'CustPymt:B' = 'Payment:Not Deposited',
  'CustPymt:C' = 'Payment:Deposited',
  'LiabPymt:V' = 'Payroll Liability Check:Voided',
  'PurchCon:A' = 'Purchase Contract:Pending Approval',
  'PurchCon:B' = 'Purchase Contract:Approved',
  'PurchCon:H' = 'Purchase Contract:Closed',
  'PurchCon:R' = 'Purchase Contract:Rejected',
  'PurchOrd:A' = 'Purchase Order:Pending Supervisor Approval',
  'PurchOrd:B' = 'Purchase Order:Pending Receipt',
  'PurchOrd:C' = 'Purchase Order:Rejected by Supervisor',
  'PurchOrd:D' = 'Purchase Order:Partially Received',
  'PurchOrd:E' = 'Purchase Order:Pending Billing/Partially Received',
  'PurchOrd:F' = 'Purchase Order:Pending Bill',
  'PurchOrd:G' = 'Purchase Order:Fully Billed',
  'PurchOrd:H' = 'Purchase Order:Closed',
  'Estimate:A' = 'Quote:Open',
  'Estimate:B' = 'Quote:Processed',
  'Estimate:C' = 'Quote:Closed',
  'Estimate:V' = 'Quote:Voided',
  'Estimate:X' = 'Quote:Expired',
  'Rfq:A' = 'Request For Quote:Pending Bid Open',
  'Rfq:B' = 'Request For Quote:Pending',
  'Rfq:C' = 'Request For Quote:Cancelled',
  'Rfq:D' = 'Request For Quote:Bid Open',
  'Rfq:E' = 'Request For Quote:Bid Closed',
  'Rfq:F' = 'Request For Quote:Partially Awarded',
  'Rfq:G' = 'Request For Quote:Fully Awarded',
  'Rfq:H' = 'Request For Quote:Closed',
  'PurchReq:A' = 'Requisition:Pending Approval',
  'PurchReq:B' = 'Requisition:Pending Order',
  'PurchReq:C' = 'Requisition:Cancelled',
  'PurchReq:D' = 'Requisition:Partially Ordered',
  'PurchReq:E' = 'Requisition:Fully Ordered',
  'PurchReq:F' = 'Requisition:Partially Received',
  'PurchReq:G' = 'Requisition:Fully Received',
  'PurchReq:H' = 'Requisition:Closed',
  'PurchReq:R' = 'Requisition:Rejected',
  'RtnAuth:A' = 'Return Authorization:Pending Approval',
  'RtnAuth:B' = 'Return Authorization:Pending Receipt',
  'RtnAuth:C' = 'Return Authorization:Cancelled',
  'RtnAuth:D' = 'Return Authorization:Partially Received',
  'RtnAuth:E' = 'Return Authorization:Pending Refund/Partially Received',
  'RtnAuth:F' = 'Return Authorization:Pending Refund',
  'RtnAuth:G' = 'Return Authorization:Refunded',
  'RtnAuth:H' = 'Return Authorization:Closed',
  'RevArrng:A' = 'Revenue Arrangement:Pending Approval',
  'RevArrng:B' = 'Revenue Arrangement:Approved',
  'RevArrng:H' = 'Revenue Arrangement:Closed',
  'RevArrng:R' = 'Revenue Arrangement:Rejected',
  'TaxPymt:V' = 'Sales Tax Payment:Voided',
  'TaxPymt:Z' = 'Sales Tax Payment:Online Bill Pay Pending Accounting Approval',
  'CustChrg:A' = 'Statement Charge:Open',
  'CustChrg:B' = 'Statement Charge:Paid In Full',
  'StPickUp:A' = 'Store Pickup Fulfillment:New',
  'StPickUp:B' = 'Store Pickup Fulfillment:Picked',
  'StPickUp:C' = 'Store Pickup Fulfillment:Picked Up',
  'TaxLiab:V' = 'Tax Liability Cheque:Voided',
  'TegPybl:E' = 'Tegata Payable:Endorsed',
  'TegPybl:I' = 'Tegata Payable:Issued',
  'TegPybl:P' = 'Tegata Payable:Paid',
  'TegRcvbl:C' = 'Tegata Receivables:Collected',
  'TegRcvbl:D' = 'Tegata Receivables:Discounted',
  'TegRcvbl:E' = 'Tegata Receivables:Endorsed',
  'TegRcvbl:H' = 'Tegata Receivables:Holding',
  'TegRcvbl:V' = 'Tegata Receivables:Voided',
  'TrnfrOrd:A' = 'Transfer Order:Pending Approval',
  'TrnfrOrd:B' = 'Transfer Order:Pending Fulfillment',
  'TrnfrOrd:C' = 'Transfer Order:Rejected',
  'TrnfrOrd:D' = 'Transfer Order:Partially Fulfilled',
  'TrnfrOrd:E' = 'Transfer Order:Pending Receipt/Partially Fulfilled',
  'TrnfrOrd:F' = 'Transfer Order:Pending Receipt',
  'TrnfrOrd:G' = 'Transfer Order:Received',
  'TrnfrOrd:H' = 'Transfer Order:Closed',
  'VendRfq:A' = 'Vendor Request For Quote:Pending Bid Open',
  'VendRfq:B' = 'Vendor Request For Quote:Pending',
  'VendRfq:C' = 'Vendor Request For Quote:Cancelled',
  'VendRfq:D' = 'Vendor Request For Quote:Bid Open',
  'VendRfq:E' = 'Vendor Request For Quote:Bid Closed',
  'VendRfq:F' = 'Vendor Request For Quote:Partially Awarded',
  'VendRfq:G' = 'Vendor Request For Quote:Fully Awarded',
  'VendRfq:H' = 'Vendor Request For Quote:Closed',
  'VendAuth:A' = 'Vendor Return Authorization:Pending Approval',
  'VendAuth:B' = 'Vendor Return Authorization:Pending Return',
  'VendAuth:C' = 'Vendor Return Authorization:Cancelled',
  'VendAuth:D' = 'Vendor Return Authorization:Partially Returned',
  'VendAuth:E' = 'Vendor Return Authorization:Pending Credit/Partially Returned',
  'VendAuth:F' = 'Vendor Return Authorization:Pending Credit',
  'VendAuth:G' = 'Vendor Return Authorization:Credited',
  'VendAuth:H' = 'Vendor Return Authorization:Closed',
  'WorkOrd:A' = 'Work Order:Planned',
  'WorkOrd:B' = 'Work Order:Released',
  'WorkOrd:C' = 'Work Order:Cancelled',
  'WorkOrd:D' = 'Work Order:In Process',
  'WorkOrd:G' = 'Work Order:Built',
  'WorkOrd:H' = 'Work Order:Closed',
}

export interface NsReactActionProps {
  action: string; // name of the function to be executed
  paramIds?: string[]; // array of react element ids - data of the elements matching these ids will be passed to the action function. If left blank, all element data will be passed.
  formElements?: Array<NsReactFieldProps | NsReactButtonProps>;
  onResponse?: NsReactActionProps; // Action to be executed on the data received from the initial action function's response
}

export interface NsReactButtonProps {
  id: string;
  label: string;
  onClick: NsReactActionProps;
  value?: string | number | boolean | NsReactSelectOption;
}

export interface NsReactElementValue {
  id: string;
  value?: string | number | boolean | NsReactSelectOption | null;
}

export interface NsReactFieldProps {
  id: string;
  label: string;
  fieldType: NsReactFieldType;
  source?: string | NsReactSelectOption[]; // Data source for select/multi-select fields. Can be an internal id of an NS record type, or an array of specific options
  defaultValue?: string | number | boolean | NsReactSelectOption;
  value?: string | number | boolean | NsReactSelectOption;
}

export enum NsReactFieldType {
  CHECKBOX = 'checkbox',
  CURRENCY = 'currency',
  DATE = 'date',
  DATETIME = 'datetime',
  EMAIL = 'email',
  FILE = 'file',
  FLOAT = 'float',
  HELP = 'help',
  INTEGER = 'integer',
  IMAGE = 'image',
  LABEL = 'label',
  MULTISELECT = 'multiselect',
  PASSWORD = 'password',
  PERCENT = 'percent',
  PHONE = 'phone',
  SELECT = 'select',
  SUBHEADER = 'subheader',
  TEXT = 'text',
  TEXTAREA = 'textarea',
  TIMEOFDAY = 'timeofday',
  URL = 'url',
}
export interface NsReactFormGridElementProps {
  element?: NsReactButtonProps | NsReactFieldProps;
  width: number;
}

export interface NsReactImageProps {
  src: string;
  height?: string;
  width?: string;
}

export interface NsReactSelectOption {
  value: string;
  label: string;
  isSelected?: boolean;
}

export interface NsReactTableDrilldownProps {
  headers: NsReactTableHeaderProps[];
  data: Array<Record<string, unknown>>;
}

export interface NsReactTableHeaderProps {
  id: string;
  label: string;
  align?: TableCellAlignOptions;
  disablePadding?: boolean;
  join?: string;
  sortable?: boolean;
  summary?: Summary;
  appWidth?: number;
  visible?: boolean;
  xlsxWidth?: number;
}

export interface NsReactTableRowProps {
  id: string;
  type: string;
  [x: string]: unknown;
  drilldown?: NsReactTableDrilldownProps;
}

export interface NsReactUrlField {
  displayText: string;
  url: string;
  newWindow?: boolean; // Defaults to true
}

export interface NsReactUserProps {
  accountId?: string;
  timezone?: string;
  domainUrl?: string;
}

export type NSRequest = {
  action: string;
  data?: Object;
  errorPolicy?: 'none' | 'all';
};

export enum TableCellAlignOptions {
  CENTER = 'center',
  INHERIT = 'inherit',
  JUSTIFY = 'justify',
  LEFT = 'left',
  RIGHT = 'right',
}

/**
 * Returns a wrapped error response
 * @function errorResponse
 * @param {String} e - The system or message error
 * @param {String} msg - Message explaining the error
 * @returns {Object} - JSON.stringify Object
 * {success: (boolean), error, message}
 */
export const errorResponse = (e: string, msg?: string) => {
  return JSON.stringify({
    success: false,
    error: e,
    message: msg,
  });
};

/**
 * Returns an errorResponse stating a pamrameter is missing for a function that was called
 * @function errorResponse
 * @param {String} par - The param that is missing
 * @returns {Object} - errorResponse
 */
export const reqPar = (par: string) => {
  return errorResponse(
    'Missing req. param',
    'Missing required parameter: ' + par
  );
};

/**
 * Returns a successResponse with data
 * @function succResponse
 * @param {Object} response - The data you want to return
 * @returns {Object}
 * {success:(boolean), data:(response)}
 */
export const succResponse = (response: any) => {
  return JSON.stringify({
    success: true,
    data: response,
  });
};
