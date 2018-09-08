module.exports = {
    canProcess: () => true,
    requiresKey: false,
    process: args => { throw Error("Unable to find matching command. See --help for information.") }
}
