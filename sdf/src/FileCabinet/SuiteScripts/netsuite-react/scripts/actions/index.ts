/**
 *@NApiVersion 2.1
 *@NModuleScope Public
 */

import * as config from 'N/config';
import * as email from 'N/email';
import * as file from 'N/file';
import * as format from 'N/format';
import * as log from 'N/log';
import * as query from 'N/query';
import * as record from 'N/record';
import * as render from 'N/render';
import * as runtime from 'N/runtime';
import * as search from 'N/search';
import * as url from 'N/url';
import {
  getElementValue,
  NsQueryTransactionStatus,
  NsQueryTransactionType,
  NsReactElementValue,
  NsReactSelectOption,
  NsReactTableHeaderProps,
  NsReactTableRowProps,
  NsReactUrlField,
  NsReactUserProps,
  TableCellAlignOptions,
} from '../../../snoosweek-demo-2023/domain/nsReact';

export const getCurrentUser = () => runtime.getCurrentUser();

export const getUserDomainUrl = (accountId: string): string => {
  return url.resolveDomain({
    hostType: url.HostType.APPLICATION,
    accountId,
  });
};

export const getUserProps = (): NsReactUserProps => {
  const userProps: NsReactUserProps = {};
  if (runtime.accountId) {
    userProps.accountId = runtime.accountId;
  }
  const timezone: string = getUserTimezone();
  if (timezone) {
    userProps.timezone = timezone;
  }
  const domainUrl: string = getUserDomainUrl(runtime.accountId);
  if (domainUrl) {
    userProps.domainUrl = domainUrl;
  }
  return userProps;
};

export const getUserTimezone = (): string => {
  const userSettings: record.Record = config.load({
    type: config.Type.USER_PREFERENCES,
  });
  const tz: string = userSettings.getValue({ fieldId: 'TIMEZONE' }).toString();
  return tz;
};

export const getSelectOptionsFromString = ({
  sourceStr,
}: {
  sourceStr: string;
}): NsReactSelectOption[] => {
  log.debug('Entered getSelectOptionsFromString', sourceStr);
  let selectOptions: NsReactSelectOption[] = [];
  let selectOptionTextFieldId: string = getSelectOptionTextFieldId(sourceStr);
  log.debug(
    'Retrieved selectOptionTextFieldId',
    'sourceStr: ' +
      sourceStr +
      ' | selectOptionTextFieldId: ' +
      selectOptionTextFieldId
  );

  // If the param string is a value supported by the query module OR a custom record id,
  // Create return values via query
  if (
    isNsQueryRecordString(sourceStr) ||
    sourceStr.indexOf('customrecord') > -1
  ) {
    log.debug(
      'Source String: ' + sourceStr,
      'Populating source list via Record Query'
    );

    const thisQuery = query.create({
      type: sourceStr,
    });

    thisQuery.condition = thisQuery.and(
      thisQuery.createCondition({
        fieldId: 'isinactive',
        operator: query.Operator.IS,
        values: false,
      })
    );

    thisQuery.columns = [
      thisQuery.createColumn({
        fieldId: 'id',
      }),
    ];

    const selectTextColumn: query.Column = thisQuery.createColumn({
      fieldId: selectOptionTextFieldId,
      alias: 'selectText',
    });
    thisQuery.columns.push(selectTextColumn);
    thisQuery.sort = [
      thisQuery.createSort({
        column: selectTextColumn,
      }),
    ];

    // Run the query as a paged query with 1000 results per page
    const myPagedResults = thisQuery.runPaged({
      pageSize: 1000,
    });

    selectOptions = getSelectOptionsFromQueryPagedData(myPagedResults);
  }
  // If the param string is a saved search id, load the search, add custom columns, and return results
  else if (sourceStr.indexOf('customsearch') > -1) {
    const thisSearch: search.Search = search.load({
      id: sourceStr,
    });
    log.debug(
      'Populating source list via Saved Search | ' + sourceStr,
      JSON.stringify(thisSearch.columns)
    );

    // Add column to use for the select option text value
    let addSelectTextColumn: boolean = true;
    thisSearch.columns.forEach(col => {
      if (typeof col === 'string') {
        return;
      } else if (col.label === 'selectText') {
        addSelectTextColumn = false;
        selectOptionTextFieldId = col.name;
      }
    });
    if (addSelectTextColumn === true) {
      thisSearch.columns.push(
        search.createColumn({
          name: selectOptionTextFieldId,
          label: 'selectText',
        })
      );
    }

    const myPagedResults = thisSearch.runPaged({
      pageSize: 1000,
    });

    selectOptions = getSelectOptionsFromSearchPagedData(
      myPagedResults,
      selectOptionTextFieldId
    );
  }
  // If the param string is a dataset id, load the dataset, add custom columns, and return results
  else if (sourceStr.indexOf('custdataset') > -1) {
    const thisQuery: query.Query = query.load({
      id: sourceStr,
    });

    log.debug(
      'Populating source list via Custom Dataset | ' + sourceStr,
      JSON.stringify(thisQuery.columns)
    );

    // Add column to use for the select option text value
    let addSelectTextColumn: boolean = true;
    thisQuery.columns.forEach(col => {
      if (col.label === 'selectText') {
        addSelectTextColumn = false;
        selectOptionTextFieldId = col.fieldId;
        thisQuery.columns.push(
          thisQuery.createColumn({
            fieldId: selectOptionTextFieldId,
            alias: 'selectText',
          })
        );
        thisQuery.sort = [
          thisQuery.createSort({
            column: col,
          }),
        ];
      }
    });

    if (addSelectTextColumn === true) {
      const selectTextColumn = thisQuery.createColumn({
        fieldId: getSelectOptionTextFieldId(thisQuery.type),
        alias: 'selectText',
      });
      thisQuery.columns.push(selectTextColumn);
      thisQuery.sort = [
        thisQuery.createSort({
          column: selectTextColumn,
        }),
      ];
    }

    thisQuery.columns.push(
      thisQuery.createColumn({
        fieldId: 'id',
      })
    );

    // Run the query as a paged query with 1000 results per page
    const myPagedResults = thisQuery.runPaged({
      pageSize: 1000,
    });

    selectOptions = getSelectOptionsFromQueryPagedData(myPagedResults);
  }
  // Else try to create a new saved search for the provided string, populating the id and name columns
  // This works for customlist id values
  else {
    log.debug(
      'Populating source list via Saved Search | ' + sourceStr,
      'selectOptionTextFieldId: ' + selectOptionTextFieldId
    );
    const thisSearch = search.create({
      type: sourceStr,
      filters: [['isinactive', search.Operator.IS, 'F']],
      columns: [
        search.createColumn({
          name: selectOptionTextFieldId,
          sort: search.Sort.ASC,
          label: 'selectText',
        }),
      ],
    });

    const myPagedResults = thisSearch.runPaged({
      pageSize: 1000,
    });

    selectOptions = getSelectOptionsFromSearchPagedData(
      myPagedResults,
      selectOptionTextFieldId
    );
  }
  log.debug('Retrieved Select Options', JSON.stringify(selectOptions));
  return selectOptions;
};

function isNsQueryRecordString(recordStr: string) {
  const values = Object.values(query.Type);
  if (values.includes(recordStr as unknown as query.Type)) {
    return true;
  }
  return false;
}

function getSelectOptionTextFieldId(recordStr: string): string {
  if (recordStr === 'customer') {
    return 'altname';
  }
  if (recordStr === 'employee' || recordStr === 'vendor') {
    return 'entityid';
  }
  if (recordStr === 'savedsearch') {
    return 'title';
  }
  if (recordStr === 'transaction') {
    return 'trandisplayname';
  }
  return 'name';
}

function getSelectOptionsFromQueryPagedData(
  pagedData: query.PagedData,
  inputSelectOptions?: NsReactSelectOption[]
): NsReactSelectOption[] {
  log.debug(
    'Entered getSelectOptionsFromQueryPagedData',
    JSON.stringify(pagedData)
  );
  log.debug('Page Count', pagedData.pageRanges.length);
  log.debug('Result Count', pagedData.count);

  let selectOptions: NsReactSelectOption[] = [];
  if (inputSelectOptions && inputSelectOptions.length) {
    selectOptions = inputSelectOptions;
  }
  // Fetch results using an iterator
  const iterator = pagedData.iterator();
  iterator.each(resultPage => {
    const currentPage = resultPage.value;
    const pageData = currentPage.data;

    const results = pageData.asMappedResults();
    if (results && results.length) {
      results.forEach(r => {
        selectOptions.push({
          value: r.id.toString(),
          label: r.selectText.toString(),
          isSelected: false,
        });
      });
    }
    return true;
  });

  return selectOptions;
}

function getSelectOptionsFromSearchPagedData(
  pagedData: search.PagedData,
  selectOptionTextFieldId: string,
  inputSelectOptions?: NsReactSelectOption[]
): NsReactSelectOption[] {
  log.debug(
    'Entered getSelectOptionsFromSearchPagedData',
    JSON.stringify(pagedData)
  );
  log.debug('Page Count', pagedData.pageRanges.length);
  log.debug('Result Count', pagedData.count);

  let selectOptions: NsReactSelectOption[] = [];
  if (inputSelectOptions && inputSelectOptions.length) {
    selectOptions = inputSelectOptions;
  }

  // Fetch results
  for (let i = 0; i < pagedData.pageRanges.length; i++) {
    const pageData = pagedData.fetch({ index: i });
    pageData.data.forEach(r => {
      selectOptions.push({
        value: r.id.toString(),
        label: r.getValue({ name: selectOptionTextFieldId }).toString(),
        isSelected: false, // Make this not required
      });
    });
  }

  return selectOptions;
}

export const buttonRestletActionFunction = () => {
  log.debug('Restlet Test', 'buttonRestletActionFunction');
};

export const getTableRowsFromSavedSearch = ({
  id,
}: {
  id: string;
}): { headers: NsReactTableHeaderProps[]; rows: NsReactTableRowProps[] } => {
  log.debug('Entered getTableRowsFromSavedSearch', id);

  const searchObj: search.Search = search.load({
    id,
  });
  log.debug('searchObj', JSON.stringify(searchObj));

  // Populate headers from paged data
  const headers: NsReactTableHeaderProps[] = [];

  searchObj.columns.forEach(col => {
    if (typeof col !== 'string') {
      const header: NsReactTableHeaderProps = {
        id: col.name,
        label: col.label,
        align: TableCellAlignOptions.CENTER,
        join: col.join ? col.join : null,
        summary: col.summary ? col.summary : null,
      };
      let headerIdCnt: number = 0;
      headers.forEach(h => {
        if (h.id.startsWith(header.id)) {
          headerIdCnt++;
        }
      });
      if (headerIdCnt > 0) {
        header.id = header.id + '_duplicate_' + headerIdCnt;
      }
      headers.push(header);
    }
  });

  log.debug('Populated Headers', JSON.stringify(headers));

  const pagedData = searchObj.runPaged({
    pageSize: 1000,
  });

  // Fetch results
  const rows: NsReactTableRowProps[] = [];
  for (let i = 0; i < pagedData.pageRanges.length; i++) {
    const pageData = pagedData.fetch({ index: i });
    pageData.data.forEach((r: search.Result, index: number) => {
      const rowData: NsReactTableRowProps = {
        id: r.id ? r.id : index.toString(),
        type: searchObj.searchType.toString(),
      };

      headers.forEach(h => {
        let fieldId: string = h.id;
        let duplicateIndex: number = fieldId.indexOf('_duplicate_');
        if (duplicateIndex > -1) {
          fieldId = fieldId.substring(0, duplicateIndex);
        }
        const fieldText: string = r.getText({
          name: fieldId,
          join: h.join,
          summary: h.summary,
        });
        const fieldValue: boolean | string | string[] = r.getValue({
          name: fieldId,
          join: h.join,
          summary: h.summary,
        });
        if (fieldText && fieldText.length) {
          const selectOption: NsReactSelectOption = {
            value: fieldValue.toString(),
            label: fieldText,
          };
          rowData[h.id] = selectOption;
        } else {
          rowData[h.id] = fieldValue;
        }
      });
      rows.push(rowData);
    });
  }

  log.debug('Populated rows', JSON.stringify(rows));

  return { headers, rows };
};

const getTableRowFromQueryResult = (
  r: {
    [fieldId: string]: string | boolean | number | NsReactSelectOption | null;
  },
  index: number,
  headerCells: NsReactTableHeaderProps[]
): NsReactTableRowProps => {
  const row: NsReactTableRowProps = {
    id: r.id ? r.id.toString() : index.toString(),
    type: r.type ? r.type.toString() : 'undefined',
  };

  headerCells.forEach(header => {
    row[header.id] = r[header.id] ? r[header.id] : null;
  });

  return row;
};

export const saveExcelFile = (props: {
  fileName: string;
  excelData: string;
  folderId: number;
  description?: string;
}): number => {
  log.debug('Entered saveExcelFile', props);

  const fileObj = file.create({
    name: props.fileName + '.xlsx',
    fileType: file.Type.EXCEL,
    contents: props.excelData,
    description: props.description ? props.description : '',
    folder: props.folderId,
  });

  const fileId = fileObj.save();
  return fileId;
};
