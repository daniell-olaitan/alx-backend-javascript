export default function createIteratorObject(report) {
  return {
    [Symbol.iterator]() {
      const keys = Object.keys(report.allEmployees);
      console.log(keys);
      let allEmployees = [];

      keys.map(deptartment => {
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

          return { value: allEmployees[i++], done: false};
        }
      };
    }
  };
}
