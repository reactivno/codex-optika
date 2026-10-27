const menu = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');
function closeMenu(returnFocus = false) {
  if (!menu || !nav) return;
  menu.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
  if (returnFocus) menu.focus();
}
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && nav?.classList.contains('open')) closeMenu(true);
});
document.addEventListener('click', e => {
  if (!e.target.closest('header')) closeMenu();
});
window.matchMedia('(min-width: 1121px)').addEventListener('change', e => {
  if (e.matches) closeMenu();
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => {
      const selected = item === button;
      item.classList.toggle('selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    document.querySelectorAll('[data-category]').forEach(item => {
      item.hidden = filter !== 'all' && item.dataset.category !== filter;
    });
  });
});
const now = new Date();
const moscowDay = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Moscow' }).format(now);
document.querySelectorAll('[data-until]').forEach(offer => {
  if (moscowDay > offer.dataset.until) offer.hidden = true;
});
document.querySelectorAll('[data-offer-until]').forEach(offer => {
  if (moscowDay > offer.dataset.offerUntil) {
    const status = offer.querySelector('.offer-status');
    status.textContent = 'Акция завершена. Уточните актуальные предложения в салоне.';
  }
});
document.querySelectorAll('.promos, .banner-promos').forEach(list => {
  if (list.children.length && [...list.children].every(item => item.hidden)) {
    const text = document.createElement('p');
    text.textContent = 'Уточните действующие предложения по телефону салона.';
    list.after(text);
    list.hidden = true;
  }
});
// The notice stores only the visitor's dismissal; no analytics are added.
const cookieNotice = document.querySelector('.cookie-notice');
if (cookieNotice) {
  let acknowledged = false;
  try { acknowledged = localStorage.getItem('optika-cookie-notice-v1') === 'acknowledged'; } catch (_) {}
  cookieNotice.hidden = acknowledged;
  document.querySelector('.cookie-accept')?.addEventListener('click', () => {
    try { localStorage.setItem('optika-cookie-notice-v1', 'acknowledged'); } catch (_) {}
    cookieNotice.hidden = true;
  });
  document.querySelector('.cookie-settings')?.addEventListener('click', () => {
    cookieNotice.hidden = false;
    document.querySelector('.cookie-accept')?.focus();
  });
}
const footerNavigation = document.querySelector('.footer-navigation');
if (footerNavigation) {
  const compactFooterQuery = window.matchMedia('(max-width: 620px)');
  footerNavigation.open = !compactFooterQuery.matches;
  compactFooterQuery.addEventListener('change', event => { footerNavigation.open = !event.matches; });
}
