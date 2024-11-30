module.exports = {
    apps: [{
        name: "ssl-api",
        script: "index.js",
        instances: "max",
        exec_mode: "cluster",
        watch: false,
        source_map_support: false
    }]
}