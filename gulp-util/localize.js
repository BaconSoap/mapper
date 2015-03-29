exports.localize = function(root) {
  return function(paths) {
    if (Array.isArray(paths)) {
      var localized = [];
      for (var i = 0; i < paths.length; i++) {
        localized.push(root + paths[i]);
      }
      return localized;
    }

    return root + paths;
  }
};
