const generateHistoryOffsets = (count) => {
  const remaining = count - 50;
  const queries = Math.ceil(remaining / 50);

  return [...new Array(queries).keys()].map((i) => (i + 1) * 50);
};

const getTripDay = (startTime) => {
  const date = new Date(startTime * 1000);
  return date.getDay();
};

const getTripHour = (startTime) => {
  const date = new Date(startTime * 1000);
  return date.getHours();
};

const updateTripsPerCity = (tripsPerCity, currentTrip) => {
  const nextTripsPerCity = Object.assign({}, tripsPerCity);
  const currentTripCity = currentTrip.start_city.display_name;
  if (!nextTripsPerCity[currentTripCity]) {
    nextTripsPerCity[currentTripCity] = 0;
  }
  nextTripsPerCity[currentTripCity]++;

  return nextTripsPerCity;
};

const updateTripsPerDay = (tripsPerDay, currentTrip) => {
  const currentTripDay = getTripDay(currentTrip.start_time);
  return tripsPerDay.map((tally, day) => {
    if (currentTripDay === day) {
      return ++tally;
    }
    return tally;
  });
};

const updateTripsPerHour = (tripsPerHour, currentTrip) => {
  const currentTripHour = getTripHour(currentTrip.start_time);
  return tripsPerHour.map((tally, hour) => {
    if (currentTripHour === hour) {
      return ++tally;
    }
    return tally;
  });
};

const updateTimeSpentWaiting = (timeSpentWaiting, currentTrip) => (
  timeSpentWaiting + currentTrip.start_time - currentTrip.request_time
);

const updateTimeSpentRiding = (timeSpentRiding, currentTrip) => (
  timeSpentRiding + currentTrip.end_time - currentTrip.start_time
);

const updateTotalDistanceTraveled = (totalDistanceTraveled, currentTrip) => (
  totalDistanceTraveled + currentTrip.distance
);

const updateLongestRide = (longestRide, currentTrip) => {
  if (longestRide.distance < currentTrip.distance) {
    return currentTrip;
  }
  return longestRide;
};

const generateStatistics = (histories) => {
  const statistics = {
    numberOfTrips: histories.length,
    tripsPerCity: {},
    tripsPerDay: [0, 0, 0, 0, 0, 0, 0],
    tripsPerHour: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    timeSpentWaiting: 0,
    timeSpentRiding: 0,
    totalDistanceTraveled: 0,
    longestRide: {
      distance: 0,
      city: null,
    },
  };
  return histories.reduce((stats, currentTrip) => {
    stats.tripsPerCity = updateTripsPerCity(stats.tripsPerCity, currentTrip);
    stats.tripsPerDay = updateTripsPerDay(stats.tripsPerDay, currentTrip);
    stats.tripsPerHour = updateTripsPerHour(stats.tripsPerHour, currentTrip);
    stats.timeSpentWaiting = updateTimeSpentWaiting(stats.timeSpentWaiting, currentTrip);
    stats.timeSpentRiding = updateTimeSpentRiding(stats.timeSpentRiding, currentTrip);
    stats.totalDistanceTraveled = updateTotalDistanceTraveled(stats.totalDistanceTraveled, currentTrip);
    stats.longestRide = updateLongestRide(stats.longestRide, currentTrip);

    return stats;
  }, statistics);
};

module.exports = {
  generateHistoryOffsets
};