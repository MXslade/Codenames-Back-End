export const addElementToFirstArrayAndRemoveFromSecond = (
  element: any,
  arrayToAdd: any[],
  arrayToRemove: any[]
) => {
  if (arrayToAdd.findIndex((item) => item === element) === -1) {
    arrayToAdd.push(element);
  }
  const index = arrayToRemove.findIndex((item) => item === element);
  if (index !== -1) {
    arrayToRemove.splice(index, 1);
  }
};

export const removeElementIfExistsInArray = (element: any, array: any[]) => {
  const index = array.findIndex((item) => item === element);
  if (index !== -1) {
    array.splice(index, 1);
  }
};
