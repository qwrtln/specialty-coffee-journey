document.addEventListener('DOMContentLoaded', () => {
  const tierLists = document.querySelectorAll('.tier-list');
  
  tierLists.forEach(tierList => {
    // Parse the data structure from the hidden input
    const dataElement = tierList.querySelector('script[type="application/json"]');
    if (!dataElement) return;
    
    const tiers = JSON.parse(dataElement.textContent);
    
    // Create the tier list structure
    tiers.forEach(tier => {
      const tierRow = document.createElement('div');
      tierRow.className = `tier-row tier-${tier.rank.toLowerCase()}`;
      
      const label = document.createElement('div');
      label.className = 'tier-label';
      label.textContent = tier.rank;
      
      const items = document.createElement('div');
      items.className = 'tier-items';
      
      tier.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'tier-item';
        itemElement.textContent = item;
        items.appendChild(itemElement);
      });
      
      tierRow.appendChild(label);
      tierRow.appendChild(items);
      tierList.appendChild(tierRow);
    });
  });
});
