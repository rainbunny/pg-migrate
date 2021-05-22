"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMode = void 0;

const getMode = () => {
  const mode = (process.argv[2] || '').toLowerCase();

  if (!['up', 'down'].includes(mode)) {
    throw new Error(`Invalid migration operation: ${mode}`);
  }

  return mode === 'up' ? 'up' : 'down';
};

exports.getMode = getMode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9nZXQtbW9kZS50cyJdLCJuYW1lcyI6WyJnZXRNb2RlIiwibW9kZSIsInByb2Nlc3MiLCJhcmd2IiwidG9Mb3dlckNhc2UiLCJpbmNsdWRlcyIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQU8sTUFBTUEsT0FBTyxHQUFHLE1BQXFCO0FBQzFDLFFBQU1DLElBQUksR0FBRyxDQUFDQyxPQUFPLENBQUNDLElBQVIsQ0FBYSxDQUFiLEtBQW1CLEVBQXBCLEVBQXdCQyxXQUF4QixFQUFiOztBQUNBLE1BQUksQ0FBQyxDQUFDLElBQUQsRUFBTyxNQUFQLEVBQWVDLFFBQWYsQ0FBd0JKLElBQXhCLENBQUwsRUFBb0M7QUFDbEMsVUFBTSxJQUFJSyxLQUFKLENBQVcsZ0NBQStCTCxJQUFLLEVBQS9DLENBQU47QUFDRDs7QUFDRCxTQUFPQSxJQUFJLEtBQUssSUFBVCxHQUFnQixJQUFoQixHQUF1QixNQUE5QjtBQUNELENBTk0iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZ2V0TW9kZSA9ICgpOiAndXAnIHwgJ2Rvd24nID0+IHtcbiAgY29uc3QgbW9kZSA9IChwcm9jZXNzLmFyZ3ZbMl0gfHwgJycpLnRvTG93ZXJDYXNlKCk7XG4gIGlmICghWyd1cCcsICdkb3duJ10uaW5jbHVkZXMobW9kZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgbWlncmF0aW9uIG9wZXJhdGlvbjogJHttb2RlfWApO1xuICB9XG4gIHJldHVybiBtb2RlID09PSAndXAnID8gJ3VwJyA6ICdkb3duJztcbn07XG4iXX0=