const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const searchForm = $('#searchForm');
const destinationInput = $('#destination');
const searchMessage = $('#searchMessage');
const stayCards = $$('.stay-card');
const emptyState = $('#emptyState');
const toast = $('#toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function filterStays({ category = 'all', destination = '' } = {}) {
  const query = destination.trim().toLowerCase();
  let visible = 0;
  stayCards.forEach(card => {
    const categories = card.dataset.category.split(' ');
    const matchesCategory = category === 'all' || categories.includes(category);
    const searchable = `${card.dataset.location} ${$('.stay-title-row h3', card).textContent}`.toLowerCase();
    const matchesDestination = !query || searchable.includes(query);
    const show = matchesCategory && matchesDestination;
    card.hidden = !show;
    if (show) visible++;
  });
  emptyState.hidden = visible !== 0;
  return visible;
}

let activeCategory = 'all';
$$('.category').forEach(button => {
  button.addEventListener('click', () => {
    $$('.category').forEach(item => item.classList.toggle('active', item === button));
    activeCategory = button.dataset.filter;
    const count = filterStays({ category: activeCategory, destination: destinationInput.value });
    searchMessage.textContent = count ? `${count} ${count === 1 ? 'stay' : 'stays'} to explore` : '';
  });
});

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const destination = destinationInput.value.trim();
  const checkin = $('#checkin').value;
  const guests = $('#guests').value;
  const count = filterStays({ category: activeCategory, destination });
  const details = [];
  if (destination) details.push(`near “${destination}”`);
  if (checkin) details.push(`from ${new Date(`${checkin}T12:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`);
  details.push(`${guests} ${guests === '1' ? 'guest' : 'guests'}`);
  searchMessage.textContent = count
    ? `Showing ${count} ${count === 1 ? 'stay' : 'stays'} ${details.join(' · ')}.`
    : `No stays found ${details.join(' · ')}. Try Varkala, Kochi, Munnar, or Kozhikode.`;
  $('#stays')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

$$('.heart-button').forEach(button => {
  button.addEventListener('click', () => {
    const saved = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', String(!saved));
    button.textContent = saved ? '♡' : '♥';
    showToast(saved ? 'Removed from your wishlist' : 'Saved to your wishlist');
  });
});

$$('.destination-link').forEach(link => {
  link.addEventListener('click', () => {
    const destination = link.dataset.destination;
    destinationInput.value = destination;
    activeCategory = 'all';
    $$('.category').forEach(item => item.classList.toggle('active', item.dataset.filter === 'all'));
    filterStays({ destination });
    searchMessage.textContent = `Showing stays matching “${destination}”.`;
  });
});

const accountButton = $('#accountButton');
const accountMenu = $('#accountMenu');
accountButton.addEventListener('click', () => {
  accountMenu.hidden = !accountMenu.hidden;
});
document.addEventListener('click', event => {
  if (!accountMenu.contains(event.target) && !accountButton.contains(event.target)) accountMenu.hidden = true;
});

const mobileMenu = $('#mobileMenu');
const mainNav = $('.main-nav');
mobileMenu.addEventListener('click', () => {
  const open = mainNav.classList.toggle('mobile-open');
  mobileMenu.setAttribute('aria-expanded', String(open));
  mobileMenu.textContent = open ? '×' : '☰';
});

$$('.nav-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    $$('.nav-tab').forEach(item => item.classList.toggle('active', item === tab));
    if (tab.dataset.tab !== 'stays') {
      showToast(`${tab.textContent.trim()} are coming soon`);
      $$('.nav-tab').forEach(item => item.classList.toggle('active', item.dataset.tab === 'stays'));
    } else {
      $('#stays').scrollIntoView({ behavior: 'smooth' });
    }
    mainNav.classList.remove('mobile-open');
    mobileMenu.textContent = '☰';
  });
});

$('#currencyButton').addEventListener('click', () => showToast('Language: English · Currency: INR (₹)'));

const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
$('#checkin').min = localDate;
$('#checkin').value = localDate;

// Avoid broken-layout surprises if a remote photo cannot load.
$$('.photo-wrap img, .host-banner img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
    img.parentElement.style.background = 'linear-gradient(135deg, #f7f7f7, #ebebeb)';
  });
});
