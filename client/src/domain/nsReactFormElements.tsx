import {
  NsReactButtonProps,
  NsReactFieldDisplayType,
  NsReactFieldProps,
  NsReactFieldType,
  NsReactFormGridElementProps,
} from 'netsuite-react';
import scienceSnoo from '../assets/images/Snoo_Science.svg';

// Function used to define and populate NS React Form Grid Rows
export const getReactFormRows = (): NsReactFormGridElementProps[][] => {
  const reactFormRows: NsReactFormGridElementProps[][] = [];

  // To populate the NS React Form with React elements,
  // Define and push NsReactGridElement arrays (representing a NS React Form Grid Row) to the reactFormRows array
  // The maximum sum of element widths for a single row is 12

  const buttonHelp: NsReactFieldProps = {
    id: 'demoButtonHelp',
    label: `NetSuite React is a framework and toolkit that allows you to build, deploy, and run modern web applications on the SuiteCloud Platform.`,
    fieldType: NsReactFieldType.HELP,
    customStyle: {
      color: '#02315c',
      fontSize: '30px',
    },
  };

  reactFormRows.push([{ element: buttonHelp, width: 12 }]);

  const buttonHelp2: NsReactFieldProps = {
    id: 'demoButtonHelp2',
    label: `Want to learn more? Just click this button`,
    fieldType: NsReactFieldType.HELP,
    customStyle: {
      color: '#ffa800',
      fontSize: '30px',
    },
  };

  reactFormRows.push([{ element: buttonHelp2, width: 12 }]);

  const startButton: NsReactButtonProps = {
    id: 'demoStartButton',
    label: 'Unlock NetSuite - React',
    onClick: {
      action: 'introMessage',
    },
    customStyle: {
      borderColor: '#fff8b8',
      backgroundColor: '#ff4500',
      color: '#ffffff',
      fontWeight: 'bolder',
      padding: '15px 30px',
      fontSize: '20px',
    },
  };

  reactFormRows.push([{ element: startButton, width: 3 }, { width: 9 }]);

  return reactFormRows;
};
