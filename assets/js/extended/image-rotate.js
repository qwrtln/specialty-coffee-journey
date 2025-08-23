document.addEventListener('DOMContentLoaded', () => {
  // Only add rotate buttons to coffee posts
  if (!window.location.pathname.includes('/coffee/')) {
    return;
  }
  
  document.querySelectorAll('.post-content img').forEach((img, index) => {
    // Store original dimensions
    const originalWidth = img.offsetWidth;
    const originalHeight = img.offsetHeight;
    
    // Create a wrapper div for each image
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `position:relative;display:inline-block;width:${originalWidth}px;height:${originalHeight}px;overflow:hidden;`;
    
    // Wrap the image
    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);
    
    // Set image to center in container
    img.style.cssText = 'position:absolute;top:50%;left:50%;transform-origin:center;transition:transform 0.3s ease;';
    img.style.transform = 'translate(-50%, -50%)';
    
    // Create button backdrop
    const btnBackdrop = document.createElement('div');
    btnBackdrop.style.cssText = 'position:absolute;bottom:14px;right:6px;width:36px;height:36px;background:rgba(255,255,255,0.3);border-radius:50%;filter:blur(4px);z-index:998;';
    
    // Create button
    const btn = document.createElement('button');
    btn.style.cssText = 'position:absolute;bottom:16px;right:8px;width:32px;height:32px;background:url("/icons/circular-clockwise-rotating-arrow.svg") center/32px no-repeat;border:none;cursor:pointer;z-index:999;';
    
    // Add rotation functionality
    let rotation = 0;
    btn.onclick = () => {
      rotation = (rotation + 90) % 360;
      img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    };
    
    wrapper.appendChild(btnBackdrop);
    wrapper.appendChild(btn);
  });
});
