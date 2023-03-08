function MakeMultiFilter(originalArray) {
    var currentArray = originalArray
  
    function arrayFilterer(filterCriteria, callback) {
      if (filterCriteria) {
        currentArray = currentArray.filter(filterCriteria);
      }
      if (callback) {
        callback.call(originalArray, currentArray);
      }
      return filterCriteria ? arrayFilterer : currentArray;
    }
  
    return arrayFilterer;
  }