/**
 * Universal Sharing Utility for Florin
 */

export const shareContent = async ({ title, text, url }) => {
  const shareData = {
    title: title || "Florin | Indian Flowers of Romance",
    text: text || "Discover the beauty and stories of Indian flowers.",
    url: url || window.location.href,
  };

  // 1. Try Native Web Share API
  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return { success: true, method: "native" };
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error sharing:", err);
      } else {
        return { success: false, method: "aborted" };
      }
    }
  }

  // 2. Return false to indicate fallback UI should be shown
  return { success: false, method: "fallback" };
};

export const getSocialShareLinks = ({ text, url }) => {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url || window.location.href);

  return {
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  }
};

export const generateInstagramCaption = (flower) => {
  return `🌹 ${flower.name.toUpperCase()}

"${flower.romanticMessage}"

✨ Meaning: ${flower.meaning}
📜 History: ${flower.symbolism}
💡 Fun Fact: ${flower.funFact}

Discover more stories of Indian flowers at Florin.
#Florin #FloralRomance #IndianFlowers #BotanicalArt

Explore at: ${window.location.host}`;
};

export const downloadImage = async (imageUrl, flowerName) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${flowerName.toLowerCase().replace(/\s+/g, "-")}-florin.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    return true;
  } catch (err) {
    console.error("Download failed:", err);
    // Fallback: just open the image in a new tab
    window.open(imageUrl, "_blank");
    return false;
  }
};

export const generateShareCard = async (flower) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    // Set for Instagram Portrait (4:5)
    canvas.width = 1080;
    canvas.height = 1350;

    img.crossOrigin = "anonymous";
    img.src = flower.imageUrl;

    img.onload = () => {
      // 1. Draw Image (Cover)
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      // 2. Add Gradient Overlay
      const gradient = ctx.createLinearGradient(0, canvas.height * 0.5, 0, canvas.height);
      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(1, "rgba(44,24,16,0.9)"); // brown-dark
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 3. Draw Title
      ctx.fillStyle = "#E75480"; // pink-rose
      ctx.font = "bold 80px 'Playfair Display', serif";
      ctx.textAlign = "center";
      ctx.fillText(flower.name, canvas.width / 2, canvas.height - 300);

      // 4. Draw Message
      ctx.fillStyle = "#FFF9F1"; // accent-cream
      ctx.font = "italic 40px 'Merriweather', serif";
      ctx.fillText(`"${flower.romanticMessage}"`, canvas.width / 2, canvas.height - 220);

      // 5. Draw Info
      ctx.font = "30px 'Poppins', sans-serif";
      ctx.fillStyle = "rgba(255,249,241,0.6)";
      ctx.fillText(`Meaning: ${flower.meaning} • Florin botanical art`, canvas.width / 2, canvas.height - 150);

      // 6. Draw URL
      ctx.font = "bold 24px 'Poppins', sans-serif";
      ctx.fillText("WWW.FLORIN.LOVE", canvas.width / 2, canvas.height - 80);

      // 7. Download Logic Refactored
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      resolve(dataUrl);
    };

    img.onerror = () => {
      console.error("Image load failed for share card");
      resolve(null);
    };
  });
};

export const generateCollageCard = async (flowers) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    // Limits and Grid setup
    const count = Math.min(flowers.length, 4); // Limit to 4 for best 2x2 collage
    const cols = count > 1 ? 2 : 1;
    const rows = Math.ceil(count / cols);
    
    canvas.width = 1200;
    canvas.height = 1200;
    
    // Background
    ctx.fillStyle = "#2C1810"; // brown-dark
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const cellW = canvas.width / cols;
    const cellH = canvas.height / rows;
    
    let loadedCount = 0;
    
    flowers.slice(0, count).forEach((flower, index) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = flower.imageUrl;
      
      img.onload = () => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const startX = col * cellW;
        const startY = row * cellH;
        
        // Draw Image (Cover cell)
        const scale = Math.max(cellW / img.width, cellH / img.height);
        const x = startX + (cellW / 2) - (img.width / 2) * scale;
        const y = startY + (cellH / 2) - (img.height / 2) * scale;
        
        // Clip to cell
        ctx.save();
        ctx.beginPath();
        ctx.rect(startX, startY, cellW, cellH);
        ctx.clip();
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        
        // Inner Overlay/Border
        ctx.strokeStyle = "rgba(255,249,241,0.2)";
        ctx.lineWidth = 10;
        ctx.strokeRect(startX, startY, cellW, cellH);
        
        // Flower Name Badge
        ctx.fillStyle = "rgba(44,24,16,0.7)"; // shadow
        ctx.font = "bold 24px 'Playfair Display', serif";
        ctx.textAlign = "right";
        ctx.fillText(flower.name, startX + cellW - 20, startY + cellH - 35);
        ctx.fillStyle = "#E75480"; // pink-rose
        ctx.fillText(flower.name, startX + cellW - 20, startY + cellH - 40);
        
        ctx.restore();
        
        loadedCount++;
        if (loadedCount === count) {
          // Final Polish
          // Add Center Logo/Branding
          ctx.font = "bold 40px 'Playfair Display', serif";
          ctx.fillStyle = "#FFF9F1";
          ctx.textAlign = "center";
          ctx.shadowBlur = 20;
          ctx.shadowColor = "rgba(0,0,0,0.5)";
          ctx.fillText("MY FLORIN FAVORITES", canvas.width / 2, canvas.height / 2 + 15);
          
          resolve(canvas.toDataURL("image/jpeg", 0.9));
        }
      };
      
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === count) resolve(canvas.toDataURL("image/jpeg", 0.9));
      };
    });
  });
};
