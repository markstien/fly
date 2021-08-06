/**
 * CGI模块
 */
import { exec } from 'child_process';

interface CGI_ENV {
  [key: string]: any;
}

export function cgi(
  env: CGI_ENV,
  absolutePath: string,
): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    console.log(absolutePath,env);
    exec(absolutePath, { env }, function (error, stdout, stderr) {
      if (error || stderr) {
        reject(null);
      } else {
        resolve(stdout);
      }
    });
  });
}
