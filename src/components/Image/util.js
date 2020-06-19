export const download = (url, options = {}) => {
  if (!url) return;

  let getBlobImage = (img) => {
    let canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      });
    });
  };

  let img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    let promise = getBlobImage(img);
    promise.then((blob) => {
      let dLink = document.createElement('a');
      dLink.download = options.alt || '';
      let downloadImgUrl = window.URL.createObjectURL(blob);
      dLink.href = downloadImgUrl;
      dLink.onclick = () => {
        window.requestAnimationFrame(() => {
          window.URL.revokeObjectURL(downloadImgUrl);
          downloadImgUrl = null;
        });
      };
      dLink.click();
    });
  };
  // 在URL后添加随机数以避免浏览器缓存，使crossOrigin生效
  img.src = url + '?' + +new Date();
};