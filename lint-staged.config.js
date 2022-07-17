module.exports = {
  "*.{js,jsx,ts,tsx}": (filenames) => {
    const onOneLine = filenames.join(" ");
    return `npm run lint -- ${onOneLine}`;
  },
};
