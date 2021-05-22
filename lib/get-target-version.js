"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTargetVersion = void 0;

const getTargetVersion = () => {
  let targetVersion = (process.argv[3] || '').toLowerCase();

  if (targetVersion.startsWith('--')) {
    targetVersion = '';
  }

  return targetVersion;
};

exports.getTargetVersion = getTargetVersion;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9nZXQtdGFyZ2V0LXZlcnNpb24udHMiXSwibmFtZXMiOlsiZ2V0VGFyZ2V0VmVyc2lvbiIsInRhcmdldFZlcnNpb24iLCJwcm9jZXNzIiwiYXJndiIsInRvTG93ZXJDYXNlIiwic3RhcnRzV2l0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFPLE1BQU1BLGdCQUFnQixHQUFHLE1BQWM7QUFDNUMsTUFBSUMsYUFBYSxHQUFHLENBQUNDLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLENBQWIsS0FBbUIsRUFBcEIsRUFBd0JDLFdBQXhCLEVBQXBCOztBQUNBLE1BQUlILGFBQWEsQ0FBQ0ksVUFBZCxDQUF5QixJQUF6QixDQUFKLEVBQW9DO0FBQ2xDSixJQUFBQSxhQUFhLEdBQUcsRUFBaEI7QUFDRDs7QUFDRCxTQUFPQSxhQUFQO0FBQ0QsQ0FOTSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBnZXRUYXJnZXRWZXJzaW9uID0gKCk6IHN0cmluZyA9PiB7XG4gIGxldCB0YXJnZXRWZXJzaW9uID0gKHByb2Nlc3MuYXJndlszXSB8fCAnJykudG9Mb3dlckNhc2UoKTtcbiAgaWYgKHRhcmdldFZlcnNpb24uc3RhcnRzV2l0aCgnLS0nKSkge1xuICAgIHRhcmdldFZlcnNpb24gPSAnJztcbiAgfVxuICByZXR1cm4gdGFyZ2V0VmVyc2lvbjtcbn07XG4iXX0=