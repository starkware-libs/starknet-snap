const {number} = require('starknet');

export function compileCalldata(args) {
  return Object.values(args).flatMap(function (value) {
    if (Array.isArray(value))
      return __spreadArray(
        [(0, number.toBN)(value.length).toString()],
        __read(
          value.map(function (x) {
            return (0, number.toBN)(x).toString();
          })
        ),
        false
      );
    if (typeof value === 'object' && 'type' in value)
      return Object.entries(value)
        .filter(function (_a) {
          var _b = __read(_a, 1),
            k = _b[0];
          return k !== 'type';
        })
        .map(function (_a) {
          var _b = __read(_a, 2),
            v = _b[1];
          return (0, number.toBN)(v).toString();
        });
    return (0, number.toBN)(value).toString();
  });
}
