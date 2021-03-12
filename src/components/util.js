const nextSevenDays = (currentDate) => {
  const results = [];
  for (let i = 1; i < 8; i++) {
    const nextDay = new Date();
    nextDay.setDate(currentDate.getDate() + i);
    results.push(nextDay);
  };
  return results;
};

export default nextSevenDays;

