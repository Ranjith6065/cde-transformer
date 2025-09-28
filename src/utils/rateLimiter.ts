async function exponentialBackoff(fn: any, retries = 3, delay = 200) {
  try {
    return await fn();
  } catch (err) {
    if (retries === 0) throw err;
    await new Promise(res => setTimeout(res, delay));
    return exponentialBackoff(fn, retries - 1, delay * 2);
  }
}

module.exports = { exponentialBackoff };
