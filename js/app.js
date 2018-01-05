var markerModels = [
  new MarkerModel('The Venetian',-115.1696526, 36.121174,'41326e00f964a52038151fe3'),
  new MarkerModel('MGM Grand',-115.1702533, 36.102576,'41326e00f964a52099141fe3'),
  new MarkerModel('Ceasars Plalace',-115.174499, 36.1161685,'41326e00f964a520da131fe3'),
  new MarkerModel('Bellagio Hotel and Casino',-115.1767051, 36.1126264,'41326e00f964a520c0131fe3'),
  new MarkerModel('New York-New York Hotel & Casino',-115.1745559, 36.1023715,'41326e00f964a520b2141fe3'),
  new MarkerModel('Luxor Hotel & Casino',-115.1760672, 36.09551,'41326e00f964a5208c141fe3')
];

$(document).ready(function () {
    console.log("ready");
    $('#sidebarCollapse').on('click', function () {
        console.log("click");
        $('#sidebar').toggleClass('active');
        // $('.collapse.in').toggleClass('in');
        // $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
});

function AppViewModel() {

    var self = this;
    self.locations = markerModels;
    self.query = ko.observable('');
    self.filteredLocations = ko.computed(function() {
      var filter = self.query().toLowerCase();
      return ko.utils.arrayFilter(self.locations, function(item) {
        const isVisible = item.name.toLowerCase().indexOf(filter) > -1 || !filter;
        if (item.marker)
          item.marker.setVisible(isVisible);
        return isVisible;
      })
    });

    self.selectFromList = function(selectedItem) {
      populateInfoWindow(selectedItem.marker, largeInfowindow);
    };

}
// Activates knockout.js
ko.applyBindings(new AppViewModel());
