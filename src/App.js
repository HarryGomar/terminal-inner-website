import React, {Component} from 'react';
import Terminal from 'terminal-in-react';


class App extends Component {

    showMsg = () => '\nMADE BY HARRY GOMAR\n'

    listFiles = (args, print) => {
        if (this.state.loginStep === 'success') {
            let output = '\nAvailable Files:\n';
            let counter = 1;
            for (const code in this.fileCodeMapping) {
                output += `${counter}. CODE: ${code} - File: ${this.fileCodeMapping[code]}\n`;
                counter++;
            }

            const lines = output.split('\n'); // Split the text by line breaks
           

            for (let i = 0; i < lines.length; i += 1) {
                setTimeout(() => {
                    print(lines[i]);
                }, 100 * i);
            }
            
        }
        else{
            print('\nERROR: Restricted Access to Command \n ');
            setTimeout(() => {
                print('\n ---  Proceed by calling LOGIN initiation ---\n');
            }, 200);
        }
    }

    state = {
        loginStep: null, // 'username' or 'password'
        enteredUsername: '',
        enteredPassword: '',
        displayText: '' // for storing the text to display

    };

    fileCodeMapping = {
        'HATE': 'Hate.txt',
        'SIMP': 'Simp.txt',
        'TRIP': 'Trip.txt',
        'MASK': 'Mask.txt',
    };

    defaultFilePath = 'default.txt'; // Set the default file path

    openFile = (args, print) => {
        if (this.state.loginStep === 'success') {
            console.log('Received args:', args[1]);

            const code = args[1]; // Get the code from the command arguments

            // Check if a code is provided, use default if not
            const filepath = code 
                ? (this.fileCodeMapping[code.toUpperCase()] || this.defaultFilePath)
                : this.defaultFilePath;

            // Construct the URL to the file
            const fileUrl = `${process.env.PUBLIC_URL}/${filepath}`;

            // Fetch the file content
            fetch(fileUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('File not found');
                    }
                    return response.text();
                })
                .then(text => {
                    const lines = text.split('\n'); // Split the text by line breaks
                    
                    for (let i = 0; i < lines.length; i += 1) {
                        setTimeout(() => {
                            print(lines[i]);
                        }, 300 * i);
                    }
                }
                )
                .catch(error => {
                    print(`Error: ${error.message}`); // Handle any errors
                });
        } else {
            print('\nERROR: Restricted Access to Command \n ');
            setTimeout(() => {
                print('\n ---  Proceed by calling LOGIN initiation --- \n ')
            }, 200);
        }
    }




    startLogin = (args, print) => {
        if(args === '')
        {
            print('\nERROR: Command not stated correctly \n ')

            setTimeout(() => {
                print('\n --- Proceed by calling LOGIN initiation CORRECTLY ---');
            }, 200);
        }
        else {
            this.setState({ loginStep: 'username' });

            print(' \nLogin Process Initiated \n ');
            setTimeout(() => {
                print('\n ---  Proceed by calling USERNAME input command---')
            }, 200);
        }
        
    }
    

    handleUsernameInput = (args, print) => {
        if (this.state.loginStep === 'username') {
            this.setState({ enteredUsername: args[1], loginStep: 'password' });
            print('\nUsername Registered \n ');
            setTimeout(() => {
                print('\n --- Proceed by calling CODE input command ---')
            }, 200);
        } else if (this.state.loginStep === 'password') {
            print('\nERROR: Already Registered Username \n ')
            setTimeout(() => {
                print('\n --- Proceed by calling CODE input command ---');
            }, 200);
        } else {
            print('\nERROR: Login Process not initialized \n')
            setTimeout(() => {
                print('\n --- Proceed by calling LOGIN initiation ---');
            }, 200);
        }
    }

    handlePasswordInput = (args, print) => {
        if (this.state.loginStep === 'password') {
            this.setState({ enteredPassword: args[1] }, () => {
                const { enteredUsername, enteredPassword } = this.state;

                setTimeout(() => {
                    print('\n Attempting LOGIN:');
                    setTimeout(() => {
                        print('...................................');
                        setTimeout(() => {
                            print('...................................');
                            setTimeout(() => {
                                print('...................................\n');
                
                                // Conditional logic after the last print
                                if (this.state.enteredUsername === 'Muelas' && this.state.enteredPassword === '5548') {
                                    this.setState({ loginStep: 'success' });
                                    print('\nSUCCESSFUL LOGIN: Restricted Access Granted');
                                } else {
                                    print('\nERROR: Login failed - Incorrect username or password. \n');
                                    setTimeout(() => {
                                        print('\n --- To try again call LOGIN initiation ---');
                                    }, 200);
                                    this.setState({ loginStep: null });
                                }
                
                            }, 800); 
                        }, 800); 
                    }, 800); 
                }, 800); 


            });
        } 
        else if (this.state.loginStep === 'username') {
            print('\nERROR: CODE entered before USERNAME \n')
            setTimeout(() => {
                print('\n --- Proceed by calling USERNAME command ---');
            }, 200);
        }
        else {
            print('\nERROR: Login Process not initialized \n')
            setTimeout(() => {
                print('\n --- Proceed by calling LOGIN initiation ---');
            }, 200);
        }
    }

    
    render(){
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "88vh",
                margin: 0, 
                show: false,
                padding: 0, 
              }}>
                <Terminal
                    watchConsoleLogging 
                    hideTopBar 
                    allowTabs = {false}
                    color='green'
                    startState = 'maximised'
                    backgroundColor='black'
                    barColor='black'
                    style={{ 
                        fontWeight: "bold", 
                        fontSize: "1.3em", 
                    }}

                    commands={{
                        'login': this.startLogin,
                        'user': this.handleUsernameInput ,
                        'code':  this.handlePasswordInput,
                        'list': this.listFiles,
                        'open': this.openFile,
                        showmsg: this.showMsg,
                    
                      }}


                    descriptions={{
                        color: false, show: false, clear: false, showmsg: false,
                        alert: 'alert', popup: 'alert',
                        'login': 'Initialize Login Process',
                        'user': 'Input Username' ,
                        'code':  'Input Code',
                        'open': 'Open File Given Directory Number',
                        'list': 'Show Available Files'
                    }}
                    
                    msg={`

        ░█████╗░██╗░░██╗░█████╗░░█████╗░  ░█████╗░██╗░░██╗░█████╗░░█████╗░
        ██╔══██╗██║░░██║██╔══██╗██╔══██╗  ██╔══██╗██║░░██║██╔══██╗██╔══██╗
        ██║░░╚═╝███████║██║░░██║██║░░██║  ██║░░╚═╝███████║██║░░██║██║░░██║
        ██║░░██╗██╔══██║██║░░██║██║░░██║  ██║░░██╗██╔══██║██║░░██║██║░░██║
        ╚█████╔╝██║░░██║╚█████╔╝╚█████╔╝  ╚█████╔╝██║░░██║╚█████╔╝╚█████╔╝
        ░╚════╝░╚═╝░░╚═╝░╚════╝░░╚════╝░  ░╚════╝░╚═╝░░╚═╝░╚════╝░░╚════╝░
                     
        Train Access Terminal                ©CHOOCHOO Computing
                    `}
                />
        
            </div>
        );
    }

}

export default App;
