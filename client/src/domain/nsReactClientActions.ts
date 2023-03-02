import dayjs from 'dayjs';
import {
  getNsReactXslxFileFromTableRows,
  handleRestletAction,
  NsReactButtonProps,
  NsReactFieldProps,
  NsReactFieldType,
  NsReactForm,
  NsReactFormGridElementProps,
  NsReactSelectOption,
  TableCellAlignOptions,
  NsReactTableHeaderProps,
  NsReactTableProps,
  NsReactTableRowProps,
  NsReactTableSourceType,
  isNsReactTable,
  NsReactUrlField,
  NsReactXlsxFile,
  upsertTableRows,
} from 'netsuite-react';

export * from 'netsuite-react/actions';

export const createSearchTable = async (reactForm: NsReactForm) => {
  const savedSearchSelectOption = (await reactForm.getElementValue(
    'selectSavedSearch'
  )) as NsReactSelectOption;

  const savedSearchTable: NsReactTableProps = {
    id: 'reactSavedSearch',
    title: 'NS React Saved Search',
    source: {
      id: savedSearchSelectOption.value,
      type: NsReactTableSourceType.SEARCH,
    },
    // checkboxSelection: true
  };

  reactForm.upsertElement({ element: savedSearchTable, width: 12 });
};

export const introMessage = async (reactForm: NsReactForm) => {
  console.log('Entered componentWalkthrough');

  reactForm.clearFormContent();
  await timeout(500);

  const reactFormIntro: NsReactFieldProps = {
    id: 'reactFormIntro',
    label: `NetSuite-React is built on a fully-responsive 12 by ∞ grid`,
    fieldType: NsReactFieldType.HELP,
    customStyle: {
      color: '#02315c',
      fontSize: '50px',
      textAlign: 'center',
    },
  };
  reactForm.appendElementsToGridRow(1, [
    { element: reactFormIntro, width: 12 },
  ]);

  await timeout(200);

  for (let i = 1; i <= 12; i++) {
    const columnField: NsReactFieldProps = {
      id: 'columnField_' + i,
      label: i.toString(),
      fieldType: NsReactFieldType.HELP,
      customStyle: {
        border: '2px solid black',
        textAlign: 'center',
        color: '#ffa800',
        fontSize: '30px',
      },
    };
    const remainingWidth: number = 12 - i;
    if (remainingWidth > 0) {
      reactForm.appendElementsToGridRow(2, [
        { element: columnField, width: 1 },
        { width: 12 - i },
      ]);
    } else {
      reactForm.appendElementsToGridRow(2, [
        { element: columnField, width: 1 },
      ]);
    }
    await timeout(50);
  }

  reactForm.appendElementsToGridRow(3, [{ width: 12 }]);

  await timeout(600);

  const reactFormIntroTypescript: NsReactFieldProps = {
    id: 'reactFormIntroTypescript',
    label: `You can populate the grid with UI components by defining simple objects & properties in TypeScript`,
    fieldType: NsReactFieldType.HELP,
    customStyle: {
      color: '#02315c',
      fontSize: '50px',
      paddingBottom: '25px',
      textAlign: 'center',
    },
  };
  reactForm.appendElementsToGridRow(4, [
    { element: reactFormIntroTypescript, width: 12 },
  ]);

  await timeout(1500);

  const sizeDemoColumnField_4_1: NsReactFieldProps = {
    id: 'sizeDemoColumnField_4_1',
    label: '4',
    fieldType: NsReactFieldType.HELP,
    customStyle: {
      border: '2px solid black',
      textAlign: 'center',
      color: '#ffa800',
      fontSize: '30px',
    },
    hidden: true,
  };

  const sizeDemoColumnField_4_2: NsReactFieldProps = {
    id: 'sizeDemoColumnField_4_2',
    label: '4',
    fieldType: NsReactFieldType.HELP,
    customStyle: {
      border: '2px solid black',
      textAlign: 'center',
      color: '#ffa800',
      fontSize: '30px',
    },
    hidden: true,
  };

  const reactFormIntroSize: NsReactFieldProps = {
    id: 'reactFormIntroSize',
    label: `Components can be any width < 12...`,
    fieldType: NsReactFieldType.HELP,
    customStyle: {
      color: '#00ccc0',
      fontSize: '40px',
      textAlign: 'center',
      verticalAlign: 'middle',
    },
  };

  reactForm.appendElementsToGridRow(5, [
    { element: sizeDemoColumnField_4_1, width: 4 },
    { element: reactFormIntroSize, width: 4 },
    { element: sizeDemoColumnField_4_2, width: 4 }
  ]);
  await timeout(500);

  sizeDemoColumnField_4_1.hidden = false;
  reactForm.upsertElement({element: sizeDemoColumnField_4_1, width: 4});
  await timeout(500);

  sizeDemoColumnField_4_2.hidden = false;
  reactForm.upsertElement({element: sizeDemoColumnField_4_2, width: 4});

  reactForm.appendElementsToGridRow(6, [{ width: 12 }]);

  await timeout(1500);

  const reactFormIntroArrange: NsReactFieldProps = {
    id: 'reactFormIntroArrange',
    label: `...and they can be arranged anywhere on the form`,
    fieldType: NsReactFieldType.HELP,
    customStyle: {
      color: '#00ccc0',
      fontSize: '40px',
      paddingBottom: '20px',
    },
  };
  reactForm.appendElementsToGridRow(7, [
    { element: reactFormIntroArrange, width: 4 },
    { width: 8}
  ]);
  await timeout(500);

  const sizeDemoColumnField_5: NsReactFieldProps = {
    id: 'sizeDemoColumnField_5',
    label: '5',
    fieldType: NsReactFieldType.HELP,
    customStyle: {
      border: '2px solid black',
      textAlign: 'center',
      color: '#ffa800',
      fontSize: '30px',
    },
  };
  reactForm.appendElementsToGridRow(7, [
    { element: sizeDemoColumnField_5, width: 5 },
    { width: 3 },
  ]);
  await timeout(500);

  const sizeDemoColumnField_2: NsReactFieldProps = {
    id: 'sizeDemoColumnField_2',
    label: '2',
    fieldType: NsReactFieldType.HELP,
    customStyle: {
      border: '2px solid black',
      textAlign: 'center',
      color: '#ffa800',
      fontSize: '30px',
    },
  };
  reactForm.appendElementsToGridRow(7, [
    { width: 1},
    { element: sizeDemoColumnField_2, width: 2 },
  ]);

  await timeout(1000);

  const reactFormComponentInfoPrompt: NsReactFieldProps = {
    id: 'reactFormComponentInfoPrompt',
    label: `Want to learn more about the components you can use? Click this button`,
    fieldType: NsReactFieldType.HELP,
    customStyle: {
      color: '#02315c',
      fontSize: '50px',
      textAlign: 'center',
    },
  };
  reactForm.appendElementsToGridRow(8, [
    { element: reactFormComponentInfoPrompt, width: 12 },
  ]);
  await timeout(1000);

  const componentButton: NsReactButtonProps = {
    id: 'componentButton',
    label: 'Explore NetSuite-React Components',
    onClick: {
      action: 'exploreComponents',
    },
    customStyle: {
      alignContent: 'center',
      borderColor: '#fff8b8',
      backgroundColor: '#ff4500',
      color: '#ffffff',
      fontWeight: 'bolder',
      marginLeft: '25%',
      padding: '15px 30px',
      fontSize: '20px',
    },
  };

  reactForm.appendElementsToGridRow(9, [
    { width: 4 },
    { element: componentButton, width: 4 },
    { width: 4 },
  ]);
};

function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}
