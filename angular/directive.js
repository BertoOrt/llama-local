app.directive('myDropdown', function () {
  return {
    link: function () {
      return $('.ui.dropdown').dropdown();
      alert('work')
    }
  }
})
