(function() {

  var alphabet = (
    "abcdefghijklmnopqrstuvwxyz" +
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
    "1234567890.,!?<>'\"\n *()-+=@;:/\\"
  );

  var i;
  var index = {};

  for (i = 0; i < alphabet.length; ++i) {
    index[alphabet[i]] = i;
  }

  function encrypt(text, key) {
    var res = '';
    for (var i = 0; i < text.length; ++i) {
      var idx = index[text[i]];
      var shift = index[key[i % key.length]];
      res += alphabet[(idx + shift) % alphabet.length];
    }
    return res;
  }

  function decrypt(text, key) {
    var res = '';
    for (var i = 0; i < text.length; ++i) {
      var idx = index[text[i]];
      var shift = index[key[i % key.length]];
      var origIdx = idx - shift;
      origIdx = origIdx < 0 ? origIdx + alphabet.length : origIdx;
      res += alphabet[origIdx];
    }
    return res;
  }

  function clear() {
    for (var i = 0; i < arguments.length; i++) {
      var element = arguments[i];
      element.innerText = '';
    }
  }

  function validateString(str) {
    for (var i = 0; i < str.length; i++) {
      if (alphabet.indexOf(str[i]) === -1) return false;
    }
    return true;
  }

  function validateText(text, errorsDiv) {
    if (!validateString(text)) {
      errorsDiv.innerText += (
          'Text may consist only of the following characters: '
          + alphabet + '.\n'
          );
      return false;
    }
    return true;
  }

  function validateKey(key, errorsDiv) {
    if (key.length === 0) {
      errorsDiv.innerText += 'Key is required\n';
      return false;
    }

    if (!validateString(key)) {
      errorsDiv.innerText += (
          'Key may consist only of the following characters: '
          + alphabet + '.\n'
          );
      return false;
    }

    return true;
  }

  function validate(key, text, errorsDiv) {
    clear(errorsDiv);
    valid = (
        validateText(text, errorsDiv) &&
        validateKey(key, errorsDiv)
        );
    return valid;
  }

  document.addEventListener('DOMContentLoaded', function(evt) {
    var resultDiv  = document.getElementById('div-result');
    var encryptBtn = document.getElementById('btn-encrypt');
    var decryptBtn = document.getElementById('btn-decrypt');

    var keyInput   = document.getElementById('input-key');
    var textInput  = document.getElementById('input-text');
    var errorsDiv  = document.getElementById('div-errors');

    decryptBtn.addEventListener('click', function(evt) {
      var key = keyInput.value;
      var text = textInput.value;
      if (validate(key, text, errorsDiv)) {
        resultDiv.innerText = decrypt(text, key);
      }
    });

    encryptBtn.addEventListener('click', function(evt) {
      var key = keyInput.value;
      var text = textInput.value;
      if (validate(key, text, errorsDiv)) {
        resultDiv.innerText = encrypt(text, key);
      }
    });
  });
})();
