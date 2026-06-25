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
  const COLLAGE_COORDINATES = {
    1: [
      { x: 55, y: 343, w: 554, h: 550 }
    ],
    2: [
      { x: 169, y: 245, w: 398, h: 286 },
      { x: 195, y: 745, w: 414, h: 278 }
    ],
    3: [
      { x: 19, y: 51, w: 698, h: 324 },
      { x: 21, y: 463, w: 694, h: 334 },
      { x: 19, y: 905, w: 698, h: 322 }
    ],
    4: [
      { x: 99, y: 309, w: 236, h: 234 },
      { x: 424, y: 423, w: 236, h: 234 },
      { x: 110, y: 674, w: 236, h: 234 },
      { x: 391, y: 865, w: 236, h: 234 }
    ],
    5: [
      { x: 159, y: 105, w: 314, h: 234 },
      { x: 303, y: 439, w: 278, h: 212 },
      { x: 83, y: 721, w: 246, h: 184 },
      { x: 449, y: 765, w: 216, h: 290 },
      { x: 59, y: 1025, w: 236, h: 176 }
    ],
    6: [
      { x: 65, y: 261, w: 252, h: 250 },
      { x: 425, y: 237, w: 252, h: 250 },
      { x: 43, y: 567, w: 250, h: 252 },
      { x: 341, y: 537, w: 256, h: 254 },
      { x: 135, y: 839, w: 270, h: 268 },
      { x: 453, y: 877, w: 248, h: 250 }
    ],
    7: [
      { x: 11, y: 89, w: 308, h: 306 },
      { x: 422, y: 92, w: 296, h: 276 },
      { x: 27, y: 417, w: 316, h: 314 },
      { x: 429, y: 397, w: 298, h: 294 },
      { x: 1, y: 771, w: 296, h: 294 },
      { x: 429, y: 721, w: 304, h: 302 },
      { x: 224, y: 990, w: 288, h: 244 }
    ]
  };

  const count = Math.min(flowers.length, 7);
  if (count === 0) return null;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const templateImg = new Image();
    templateImg.crossOrigin = "anonymous";
    templateImg.src = `/Collage/${count} images.jpg`;

    templateImg.onload = async () => {
      canvas.width = templateImg.naturalWidth || templateImg.width;
      canvas.height = templateImg.naturalHeight || templateImg.height;

      // Draw background template
      ctx.drawImage(templateImg, 0, 0);

      const slots = COLLAGE_COORDINATES[count];
      if (!slots) {
        resolve(canvas.toDataURL("image/jpeg", 0.9));
        return;
      }

      // Load all flower images
      const flowerLoadPromises = flowers.slice(0, count).map((flower) => {
        return new Promise((res) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = flower.imageUrl;
          img.onload = () => res(img);
          img.onerror = () => {
            console.error(`Failed to load image for flower: ${flower.name}`);
            res(null); // resolve with null so others can still load
          };
        });
      });

      const loadedImgs = await Promise.all(flowerLoadPromises);

      // Draw each loaded image centered in its slot, maximized to fill the slot, and slightly tilted
      loadedImgs.forEach((img, index) => {
        if (!img) return; // skip if image failed to load
        const s = slots[index];
        if (!s) return;

        // Subtle hand-crafted polaroid tilt angles (alternating between ~2 to ~3 degrees)
        const angle = [0.04, -0.05, 0.03, -0.04, 0.05, -0.03, 0.04][index % 7];
        const cos = Math.abs(Math.cos(angle));
        const sin = Math.abs(Math.sin(angle));

        // Get base contain dimensions (fill the square as much as possible)
        const baseScale = Math.min(s.w / img.width, s.h / img.height);
        const baseW = img.width * baseScale;
        const baseH = img.height * baseScale;

        // Calculate the bounding box size of the rotated image
        const rotW = baseW * cos + baseH * sin;
        const rotH = baseW * sin + baseH * cos;

        // Scale down just enough so the rotated corners do not exceed the slot frame
        const fitFactor = Math.min(s.w / rotW, s.h / rotH);
        const drawW = baseW * fitFactor;
        const drawH = baseH * fitFactor;

        // Draw rotated image centered inside the slot frame
        const centerX = s.x + s.w / 2;
        const centerY = s.y + s.h / 2;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
        ctx.restore();
      });

      resolve(canvas.toDataURL("image/jpeg", 0.9));
    };

    templateImg.onerror = () => {
      console.error(`Failed to load collage template: ${count} images.jpg`);
      reject(new Error(`Failed to load template ${count} images.jpg`));
    };
  });
};
