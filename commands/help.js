module.exports = {
    canProcess: args => args["help"],
    requiresKey: false,
    process: args => console.log(`Available commands:\nDecode jwt: -d jwt\nVerify jwt: -v jwt -k secret.pem\nUpdate jwt: -u jwt -k secret.pem --ekeyName="['text', 'to', 'be', 'evaluated', 'and', 'saved']" --ckeyName2="no evaluation"`)
}
