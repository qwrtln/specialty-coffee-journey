document.addEventListener('DOMContentLoaded', () => {
  const tierLists = document.querySelectorAll('.tier-list');

  tierLists.forEach(tierList => {
    const dataElement = tierList.querySelector('script[type="application/json"]');
    if (!dataElement) return;

    const tiers = JSON.parse(dataElement.textContent);

    tiers.forEach(tier => {
      const tierRow = document.createElement('div');
      tierRow.className = `tier-row tier-${tier.rank.toLowerCase()}`;

      const label = document.createElement('div');
      label.className = 'tier-label';
      label.textContent = tier.rank;

      const items = document.createElement('div');
      items.className = 'tier-items';

      tier.items.forEach(item => {
        const itemElement = document.createElement('a');
        itemElement.className = 'tier-item';
        itemElement.textContent = item;

        const tagUrl = item.toLowerCase()
                           .replace(/\s+/g, '-')        // Replace spaces with hyphens
                           .replace(/&/g, '')           // Remove apersands
                           .replace(/'/g, '')           // Remove apostrophes

        itemElement.href = `/tags/${encodeURIComponent(tagUrl)}/`;

        items.appendChild(itemElement);
      });

      tierRow.appendChild(label);
      tierRow.appendChild(items);
      tierList.appendChild(tierRow);
    });
  });
});
