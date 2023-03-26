// define the TemplateProcessor class
function TemplateProcessor(template) {
  this.template = template;
}

// define the fillIn method
TemplateProcessor.prototype.fillIn = function(dictionary) {
  var regex = /{{\s*([\w]+)\s*}}/g;
  var result = this.template.replace(regex, function(match, p1) {
    var properties = p1.split('.');
    // go through dictionary to find the value of the property
    var value = dictionary;
    for (var i = 0; i < properties.length; i++) {
      if (value.hasOwnProperty(properties[i])) {
        value = value[properties[i]];
      } else {
        value = '';
        break;
      }
    }
    return value;
  });
  return result;
};