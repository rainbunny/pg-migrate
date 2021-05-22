"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScriptParams = void 0;

const getScriptParams = () => {
  const {
    argv
  } = process;
  const params = {};
  argv.forEach((str, index, argvArr) => {
    if (str.startsWith('--') && argvArr.length > index + 1) {
      const paramName = str.replace('--', '');
      params[paramName] = argvArr[index + 1];
    }
  });
  return {
    params
  };
};

exports.getScriptParams = getScriptParams;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9nZXQtc2NyaXB0LXBhcmFtcy50cyJdLCJuYW1lcyI6WyJnZXRTY3JpcHRQYXJhbXMiLCJhcmd2IiwicHJvY2VzcyIsInBhcmFtcyIsImZvckVhY2giLCJzdHIiLCJpbmRleCIsImFyZ3ZBcnIiLCJzdGFydHNXaXRoIiwibGVuZ3RoIiwicGFyYW1OYW1lIiwicmVwbGFjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFPLE1BQU1BLGVBQWUsR0FBRyxNQUEwQztBQUN2RSxRQUFNO0FBQUNDLElBQUFBO0FBQUQsTUFBU0MsT0FBZjtBQUNBLFFBQU1DLE1BQWdDLEdBQUcsRUFBekM7QUFFQUYsRUFBQUEsSUFBSSxDQUFDRyxPQUFMLENBQWEsQ0FBQ0MsR0FBRCxFQUFNQyxLQUFOLEVBQWFDLE9BQWIsS0FBeUI7QUFDcEMsUUFBSUYsR0FBRyxDQUFDRyxVQUFKLENBQWUsSUFBZixLQUF3QkQsT0FBTyxDQUFDRSxNQUFSLEdBQWlCSCxLQUFLLEdBQUcsQ0FBckQsRUFBd0Q7QUFDdEQsWUFBTUksU0FBUyxHQUFHTCxHQUFHLENBQUNNLE9BQUosQ0FBWSxJQUFaLEVBQWtCLEVBQWxCLENBQWxCO0FBQ0FSLE1BQUFBLE1BQU0sQ0FBQ08sU0FBRCxDQUFOLEdBQW9CSCxPQUFPLENBQUNELEtBQUssR0FBRyxDQUFULENBQTNCO0FBQ0Q7QUFDRixHQUxEO0FBT0EsU0FBTztBQUFDSCxJQUFBQTtBQUFELEdBQVA7QUFDRCxDQVpNIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGdldFNjcmlwdFBhcmFtcyA9ICgpOiB7cGFyYW1zOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ319ID0+IHtcbiAgY29uc3Qge2FyZ3Z9ID0gcHJvY2VzcztcbiAgY29uc3QgcGFyYW1zOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcblxuICBhcmd2LmZvckVhY2goKHN0ciwgaW5kZXgsIGFyZ3ZBcnIpID0+IHtcbiAgICBpZiAoc3RyLnN0YXJ0c1dpdGgoJy0tJykgJiYgYXJndkFyci5sZW5ndGggPiBpbmRleCArIDEpIHtcbiAgICAgIGNvbnN0IHBhcmFtTmFtZSA9IHN0ci5yZXBsYWNlKCctLScsICcnKTtcbiAgICAgIHBhcmFtc1twYXJhbU5hbWVdID0gYXJndkFycltpbmRleCArIDFdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHtwYXJhbXN9O1xufTtcbiJdfQ==