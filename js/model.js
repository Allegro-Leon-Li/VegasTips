// Define the model as in MVVM
function MarkerModel(name, lng, lat, venue_id, marker) {
    var self = this;
    self.name = name;
    self.lng = lng;
    self.lat = lat;
    self.marker = marker;
    self.venue_id = venue_id;
}
