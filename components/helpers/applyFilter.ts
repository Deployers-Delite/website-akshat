/* eslint-disable max-depth */
/* eslint-disable no-restricted-syntax */
interface SortableItem {
  value: string;
  text: string;
}

interface CheckItem {
  name: string;
}

interface DataItem {
  [key: string]: any; // Assuming data items can have any structure
}

export function sortFilter(arr: SortableItem[]): SortableItem[] {
  return arr.sort((a, b) => {
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > b.value) {
      return 1;
    }

    return 0;
  });
}

export const applyFilterList = (checks: CheckItem[],
  data: DataItem[],
  setFilters: (lists: Record<string, SortableItem[]>) => void): void => {
  if (Object.keys(checks).length) {
    const lists: Record<string, SortableItem[]> = {};

    checks.forEach((check) => {
      lists[check.name] = [];
    });
    for (let i = 0; i < data.length; i++) {
      const res = data[i];

      for (const key in lists) {
        const result = data[i][key];

        if (res) {
          if (lists[key].length) {
            if (Array.isArray(result)) {
              result.forEach((a: any) => {
                if (a.name) {
                  if (!lists[key].some((e) => e.value === a.name)) {
                    const newData: SortableItem = {
                      value: a.name,
                      text: a.name
                    };

                    lists[key].push(newData);
                    sortFilter(lists[key]);
                  }
                } else if (!lists[key].some((e) => e.value === a)) {
                  const newData: SortableItem = {
                    value: a,
                    text: a
                  };

                  lists[key].push(newData);
                  sortFilter(lists[key]);
                }
              });
            } else if (!lists[key].some((e) => e.value === result)) {
              const newData: SortableItem = {
                value: result,
                text: result
              };

              lists[key].push(newData);
              sortFilter(lists[key]);
            }
          } else if (Array.isArray(result)) {
            result.forEach((e: any) => {
              const newData: SortableItem = {
                value: e.name || e,
                text: e.name || e
              };

              lists[key].push(newData);
            });
          } else {
            const newData: SortableItem = {
              value: result,
              text: result
            };

            lists[key].push(newData);
          }
        }
      }
    }
    setFilters(lists);
  }
};

export const onFilterApply = (data: DataItem[],
  onFilter: (result: DataItem[]) => void,
  query: Record<string, string>): void => {
  let result = data;

  if (query && Object.keys(query).length >= 1) {
    for (const property in query) {
      const res = result.filter((e) => {
        if (!query[property] || e[property] === query[property]) {
          return true;
        }
        if (Array.isArray(e[property])) {
          return e[property].some((data) => data.name === query[property]) || e[property].includes(query[property]);
        }

        return false;
      });

      result = res;
    }
  }
  onFilter(result);
};
