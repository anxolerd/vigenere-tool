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

    document.addEventListener('DOMContentLoaded', function(evt) {
        var resultDiv  = document.getElementById('div-result');
        var encryptBtn = document.getElementById('btn-encrypt');
        var decryptBtn = document.getElementById('btn-decrypt');
        var keyInput   = document.getElementById('input-key');
        var textInput  = document.getElementById('input-text');

        decryptBtn.addEventListener('click', function(evt) {
            var key = keyInput.value;
            var text = textInput.value;
            resultDiv.innerText = decrypt(text, key);
        });

        encryptBtn.addEventListener('click', function(evt) {
            var key = keyInput.value;
            var text = textInput.value;
            resultDiv.innerText = encrypt(text, key);
        });
    });
})();
