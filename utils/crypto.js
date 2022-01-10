const { randomBytes, createHash } = require('crypto');

// Returns a new random hex string of the given even size.
function randomHexString(size = 32) {
  if (size === 0) {
    throw new Error('Zero-length randomHexString is useless.');
  }

  if (size % 2 !== 0) {
    throw new Error('randomHexString size must be divisible by 2.');
  }

  return randomBytes(size / 2).toString('hex');
}

// Returns a new random alphanumeric string of the given size.
function randomString(size) {
  if (size === 0) {
    throw new Error('Zero-length randomString is useless.');
  }

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789';
  let objectId = '';
  const bytes = randomBytes(size);
  for (let i = 0; i < bytes.length; ++i) {
    objectId += chars[bytes.readUInt8(i) % chars.length];
  }
  return objectId;
}

// Returns a new random hex string suitable for secure tokens.
function newToken() {
  return randomHexString(32);
}

function md5Hash(string) {
  return createHash('md5').update(string).digest('hex');
}

module.exports = {
  randomHexString,
  randomString,
  newToken,
  md5Hash,
};
