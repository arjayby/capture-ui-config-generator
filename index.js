const fn = (str) => {
  let substr = "";
  let longest = "";
  let array = [];

  const strLength = str.length;

  for (let i = 0; i < strLength; i++) {
    const curr = str[i];

    if (substr.includes(curr)) {
      array.push(substr);
      substr = curr;
    } else if (strLength === i + 1) {
      substr += curr;
      array.push(substr);
    } else {
      substr += curr;
    }
  }

  for (let i = 0; i < array.length; i++) {
    const curr = array[i];

    if (curr.length > longest.length) {
      longest = curr;
    }
  }

  return {
    array,
    longest,
  };
};

console.log(fn("ABCDDDEFGHI"));
