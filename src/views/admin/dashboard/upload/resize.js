const maxWidth = 1000;
const maxHeight = 800;

export default function resizeImage(file, callback) {
  const img = new Image();
  const reader = new FileReader();

  reader.onload = (e) => {
    img.src = e.target.result;

    img.onload = () => {
      const createImageFromBlob = (blob) => {
        const nameFormatted = () => {
          if (file.name.includes("png") || file.name.includes("jpg"))
            return file.name.slice(0, -4) + ".webp";
          if (file.name.includes("jpeg") || file.name.includes("webp"))
            return file.name.slice(0, -5) + ".webp";
        };
        const imageResized = new File([blob], nameFormatted(), {
          type: "image/webp",
          lastModified: Date.now(),
        });
        callback(imageResized);
      };

      const canvas = document.createElement("canvas");
      let imgWidth = img.width;
      let imgHeight = img.height;

      if (imgWidth > maxWidth || imgHeight > maxHeight) {
        if (imgWidth > imgHeight) {
          imgHeight *= maxHeight / imgHeight;
          imgWidth = maxWidth;
        } else {
          imgWidth *= maxWidth / imgWidth;
          imgHeight = maxHeight;
        }
      }

      canvas.width = imgWidth;
      canvas.height = imgHeight;
      const context = canvas.getContext("2d");
      context.drawImage(img, 0, 0, imgWidth, imgHeight);
      context.canvas.toBlob(createImageFromBlob, "image/webp", 0.75);
    };
  };
  reader.readAsDataURL(file);
}
