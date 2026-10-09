export const bnToEnNumber = (str: string | number): number => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  let numStr = String(str);
  bnDigits.forEach((digit, i) => {
    numStr = numStr.replaceAll(digit, String(i));
  });
  return parseFloat(numStr.replace(/[^0-9.]/g, "")) || 0;
};

export const enToBnNumber = (num: number | string): string => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (w) => bnDigits[parseInt(w)]);
};

export const sortProducts = (products: any[], sortOption: string) => {
  if (sortOption === "lowToHigh") {
    return [...products].sort(
      (a, b) => bnToEnNumber(a.today) - bnToEnNumber(b.today)
    );
  }
  if (sortOption === "highToLow") {
    return [...products].sort(
      (a, b) => bnToEnNumber(b.today) - bnToEnNumber(a.today)
    );
  }
  return products;
};