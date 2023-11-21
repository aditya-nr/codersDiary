function useCurrentDayIndex(startDate) {
    // Convert the start date string to a Date object
    var startDateObj = new Date(startDate);

    // Get the current date
    var currentDate = new Date();

    // Calculate the time difference in milliseconds
    var timeDifference = currentDate - startDateObj;

    // Convert the time difference to days
    var daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysPassed;
}

export default useCurrentDayIndex