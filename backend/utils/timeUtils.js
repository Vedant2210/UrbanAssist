const convertToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const isTimeInRange = (bookingTime, startTime, endTime) => {
  const booking = convertToMinutes(bookingTime);
  const start = convertToMinutes(startTime);
  const end = convertToMinutes(endTime);

  return booking >= start && booking <= end;
};

module.exports = { convertToMinutes, isTimeInRange };
