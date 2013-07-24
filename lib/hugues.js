var defaultConfig = require(__dirname + "/config-default");

function mergeDefaults(o1, o2) {
  for (var p in o2) {
    try {
      if (typeof o2[p] == "object") {
        o1[p] = mergeDefaults(o1[p], o2[p]);
      } else if (typeof o1[p] == "undefined") {
        o1[p] = o2[p];
      }
    } catch (e) {
      o1[p] = o2[p];
    }
  }

  return o1;
}

module.exports = function(config) {

  function configure(config) {
    config = config || {};
    mergeDefaults(config, defaultConfig);
    return config;
  }

  config = configure(config);

  return {
    "GetTitles": require("./GetTitles")(config),
    "GetNationalities": require("./GetNationalities")(config),
  }
};