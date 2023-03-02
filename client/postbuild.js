import mv from 'mv';
import rimraf from 'rimraf';
const folderName = 'client';

rimraf(
  `../sdf/src/FileCabinet/SuiteScripts/snoosweek-demo-2023/${folderName}`,
  () => {
    mv(
      'build',
      `../sdf/src/FileCabinet/SuiteScripts/snoosweek-demo-2023/${folderName}`,
      function (err, succ) {
        if (err) console.log(err);
        else
          console.log(
            '\nBuild completed!\nIn the sdf folder run "npm run deploy"'
          );
      }
    );
  }
);
