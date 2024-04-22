export const getTimeDifference = (date: string): string => {
  const currentDate = new Date();
  const messageDate = new Date(date);

  const differenceInSeconds = Math.floor((currentDate.getTime() - messageDate.getTime()) / 1000);

  if (differenceInSeconds < 60) {
    return "just now";
  } else if (differenceInSeconds < 3600) {
    const minutes = Math.floor(differenceInSeconds / 60);
    return `${minutes} ${minutes === 1 ? "min" : "mins"} ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (differenceInSeconds < 604800) {
      const days = Math.floor(differenceInSeconds / 86400);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else {
    // For longer durations, you might want to return the actual date
    // You can use libraries like date-fns or moment.js for more complex formatting
    return messageDate.toLocaleString();
  }
};


export function formatTimeOrDate(dateTimeString: string) {
  const dateTime = new Date(dateTimeString);
  const now = new Date();

  // Compare the given time with the current time
  if (dateTime.getTime() > now.getTime()) {
    // If the given time is in the future, display the date
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateTime.toLocaleDateString(undefined, options);
  } else {
    // If the given time is in the past, display the time without seconds and with AM/PM format
    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    return dateTime.toLocaleTimeString(undefined, options);
  }
}
