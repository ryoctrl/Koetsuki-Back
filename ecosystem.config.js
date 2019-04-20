module.exports = {
    apps: [
        {
            name: 'koetuki-b',
            script: 'npm',
            args: 'start',
            watch: ['controllers/', 'routes/', 'models/'],
        }
    ]
}
