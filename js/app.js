var markerModels = [
  new MarkerModel('The Venetian',-115.1696526, 36.121174),
  new MarkerModel('MGM Grand',-115.1702533, 36.102576),
  new MarkerModel('Ceasars Plalace',-115.174499, 36.1161685),
  new MarkerModel('Bellagio Hotel and Casino',-115.1767051, 36.1126264),
  new MarkerModel('New York-New York Hotel & Casino',-115.1745559, 36.1023715),
  new MarkerModel('Luxor Hotel & Casino',-115.1760672, 36.09551)
];
function AppViewModel() {
    this.firstName = ko.observable("Bert");
    this.lastName = ko.observable("Bertington");
    this.fullName = ko.computed(function() {
      return this.firstName() + " " + this.lastName();
    }, this);
    this.capitalizeLastName = function() {
        var currentVal = this.lastName();        // Read the current value
        this.lastName(currentVal.toUpperCase()); // Write back a modified value
    };

}
// Activates knockout.js
ko.applyBindings(new AppViewModel());
