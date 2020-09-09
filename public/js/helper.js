function updateCrest(event) {
  const imgURL = window.URL.createObjectURL(event.target.files[0]);
  document.querySelector('#crest').src = imgURL;
}

document.querySelector('#crestUploadBtn').addEventListener('change', updateCrest);
