export const formatPrice = (price) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const withDecimal = price / 100;

  return formatter.format(withDecimal.toFixed(2));
};

export const getUniqueValues = (productList) => {
  const result = {
    category: new Set(),
    colors: new Set(),
    company: new Set(),
    maxPrice: 0,
  };

  productList.forEach((product) => {
    Object.keys(result).map((key) => {
      if (key === `maxPrice`) {
        result[key] =
          result[key] >= product.price ? result[key] : product.price;
        return result[key];
      }
      if (key === `colors`) {
        return result[key].add(...product[key]);
      }
      return result[key].add(product[key]);
    });
  });

  console.log(result);
  return {
    ...result,
    category: Array.from(result.category),
    colors: Array.from(result.colors),
    company: Array.from(result.company),
  };
};
