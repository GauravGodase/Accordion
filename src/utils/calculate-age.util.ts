export const calculateAge = (dob: string) => {
  const dobDate = new Date(dob);
  const currentDate = new Date();

  if (isNaN(dobDate.getTime())) {
    // Invalid date format
    return null;
  }

  const age = currentDate.getFullYear() - dobDate.getFullYear();

  // Adjust age based on the month and day of birth
  if (
    currentDate.getMonth() < dobDate.getMonth() ||
    (currentDate.getMonth() === dobDate.getMonth() &&
      currentDate.getDate() < dobDate.getDate())
  ) {
    return age - 1;
  }

  return age;
};
