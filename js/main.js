(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initMobileNav();
        initScrollReveal();
        initBackToTop();
        initDropdowns();
        initActiveNavigation();
    });

    function initDropdowns() {
        document.querySelectorAll('.nav a[data-dropdown]').forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
            });
        });
    }

    function initMobileNav() {
        var toggle = document.querySelector('.menu-toggle');
        var nav = document.querySelector('.nav');
        var backdrop = document.querySelector('.nav-backdrop');
        var closeBtn = document.querySelector('.drawer-close');
        if (!toggle || !nav) return;

        function setOpen(open) {
            nav.classList.toggle('open', open);
            if (backdrop) backdrop.classList.toggle('open', open);
            document.body.classList.toggle('drawer-open', open);
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
            if (open && closeBtn) closeBtn.focus();
            if (!open) toggle.focus();
        }

        toggle.addEventListener('click', function() {
            setOpen(!nav.classList.contains('open'));
        });

        if (closeBtn) closeBtn.addEventListener('click', function() { setOpen(false); });
        if (backdrop) backdrop.addEventListener('click', function() { setOpen(false); });

        nav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() { setOpen(false); });
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('open')) setOpen(false);
        });
    }

    function initActiveNavigation() {
        var current = window.location.pathname.split('/').pop() || 'index.html';
        if (current === '') current = 'index.html';
        document.querySelectorAll('.nav a[data-nav-key]').forEach(function(link) {
            var href = link.getAttribute('href');
            var isActive = href === current || (current === 'index.html' && href === 'index.html');
            link.classList.toggle('active', isActive);
            if (isActive) link.setAttribute('aria-current', 'page');
            else link.removeAttribute('aria-current');
        });
    }

    function initScrollReveal() {
        var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
            document.querySelectorAll('.reveal').forEach(function(el) {
                el.classList.add('visible');
            });
            return;
        }

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });
    }

    function initBackToTop() {
        var topBtn = document.createElement('button');
        topBtn.className = 'back-to-top';
        topBtn.setAttribute('aria-label', 'Scroll to top');
        topBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 15l-6-6-6 6"/></svg>';
        topBtn.style.cssText = 'position:fixed;bottom:24px;left:24px;width:44px;height:44px;border-radius:50%;background:var(--green);color:#fff;border:0;cursor:pointer;display:none;place-items:center;z-index:90;box-shadow:var(--shadow);transition:opacity 0.2s,transform 0.2s;';
        document.body.appendChild(topBtn);

        topBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        var ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    if (window.scrollY > 400) {
                        topBtn.style.display = 'grid';
                        topBtn.style.opacity = '1';
                    } else {
                        topBtn.style.display = 'none';
                        topBtn.style.opacity = '0';
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
})();