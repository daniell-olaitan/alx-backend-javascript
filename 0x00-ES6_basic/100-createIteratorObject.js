export default function createIteratorObject(report) {
  return {
    [Symbol.iterator]() {
      const keys = Object.keys(report.allEmployees);
      let allEmployees = [];

      keys.map((deptartment) => {
        const employees = report.allEmployees[deptartment];
        allEmployees = [...allEmployees, ...employees];

        return deptartment;
      });

      const len = allEmployees.length - 1;
      let i = 0;

      return {
        next() {
          if (i > len) {
            return { value: undefined, done: true };
          }

          const obj = { value: allEmployees[i], done: false };
          i += 1;
          return obj;
        },
      };
    },
  };
}
