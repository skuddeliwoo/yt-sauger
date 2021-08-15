if (document.readyState == 'loading') {
	document.onreadystatechange = function () {
		if (document.readyState == 'interactive') {
			app();
		}
	}
} else {
	app();
}

function app() {
  const convertButton = document.querySelector('#convertButton');
  const linksTextarea = document.querySelector('#linksTextarea');

  convertButton.onclick = async () => {
    console.log('saugen clik');

    const links = linksTextarea.value.split('\n')
    .map(el => el.trim())
    .filter(el => el != '')

    if (links && links.length > 0) {
      window.open(`./convert/${encodeURIComponent(btoa(links))}`, '_blank');

      // console.log(res);
    }
  }
}
