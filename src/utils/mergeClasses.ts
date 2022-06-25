const mergeClasses = (...objects: any[]) => {
  return objects.reduce((acc, obj) => {
    return { ...acc, ...obj };
  }, {});
};

export default mergeClasses;
