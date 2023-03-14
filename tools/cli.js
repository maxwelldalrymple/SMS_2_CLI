const execSync = require('child_process').execSync; //import child_process lib, allows control of subprocesses

function cli_output(command){ //user defined function taking 1 arg (command: string)

    const output = execSync(command, { encoding: 'utf-8' }); // use fuction arg (command: string) as the input for execSync. ExecSync runs cli instance and saves ouput
    return output; // retruns output
}

module.exports = { cli_output }; // export function

