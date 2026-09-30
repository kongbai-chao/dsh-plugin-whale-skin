// Host plugin body — this package contributes browser presentation only.
// The empty apply gives the Loader a host-side row while the browser half
// ships through `exports["./client"]`.
function apply() {}
export { apply };
