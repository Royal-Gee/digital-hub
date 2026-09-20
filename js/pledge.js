(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        var pledgeItems = document.querySelectorAll('[data-pledge]');
        var countEl = document.getElementById('pledge-count');
        var resultEl = document.getElementById('pledge-result');
        var btn = document.getElementById('pledgeBtn');
        var resetBtn = document.getElementById('pledgeReset');

        if (!pledgeItems.length) return;

        function updateCount() {
            var checked = 0;
            pledgeItems.forEach(function(cb) { if (cb.checked) checked++; });
            if (countEl) {
                countEl.textContent = checked + ' of ' + pledgeItems.length + ' commitments selected';
            }
            return checked;
        }

        pledgeItems.forEach(function(cb) {
            cb.addEventListener('change', function() {
                var checked = updateCount();
                if (resultEl) {
                    resultEl.style.display = 'none';
                }
                if (checked === pledgeItems.length && btn) {
                    btn.textContent = 'Pledge Complete';
                } else if (btn) {
                    btn.textContent = 'Complete Pledge';
                }
            });
        });

        if (btn) {
            btn.addEventListener('click', function() {
                var checked = updateCount();
                if (checked === 0) {
                    if (resultEl) {
                        resultEl.className = 'feedback error show';
                        resultEl.textContent = 'Please select at least one commitment before completing the pledge.';
                        resultEl.style.display = 'block';
                    }
                    return;
                }
                if (resultEl) {
                    resultEl.className = 'feedback success show';
                    resultEl.innerHTML = '<strong>Thank you.</strong> You have selected ' + checked + ' commitment' + (checked > 1 ? 's' : '') + '. Digital literacy is a journey — every commitment counts.';
                    resultEl.style.display = 'block';
                }
                if (btn) btn.textContent = 'Pledge Complete';
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                pledgeItems.forEach(function(cb) { cb.checked = false; });
                updateCount();
                if (resultEl) { resultEl.style.display = 'none'; }
                if (btn) btn.textContent = 'Complete Pledge';
            });
        }

        updateCount();
    });
})();