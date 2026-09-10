import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // footer nav
  const wrapper = footer.querySelector('.default-content-wrapper');

if (wrapper) {
  const logo = wrapper.querySelector('picture')?.closest('p');
  const tagline = logo?.nextElementSibling;
  const address = tagline?.nextElementSibling;
  const navList = wrapper.querySelector('ul');

  if (logo && tagline && address && navList) {
    const brand = document.createElement('div');
    brand.className = 'footer-brand';

    const nav = document.createElement('div');
    nav.className = 'footer-nav';

    brand.append(logo, tagline, address);
    nav.append(navList);

    wrapper.replaceChildren(brand, nav);
  }
}

  block.append(footer);
}
