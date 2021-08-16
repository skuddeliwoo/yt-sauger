if (document.readyState == 'loading') {
	document.onreadystatechange = function () {
		if (document.readyState == 'interactive') {
			app();
		}
	}
} else {
	app();
}

class LinkBuffer {
  constructor(htmlList) {
    this.list = htmlList
    this.links = []
  }

  addLinks(urls) {
    urls.map((url) => {
      if (this.links.indexOf(url) == -1) {
        this.links.push(url)

        let li = document.createElement('li')
        li.appendChild(document.createTextNode(url))
        this.list.appendChild(li)
      }
    })
  }

  consumeLink() {
    const link = this.links.pop()

    this.list.removeChild(
      this.list.children.item(this.list.children.length - 1)
    )

    return link;
  }
}

function app() {
  const convertButton = document.querySelector('#convertButton');
  const compileButton = document.querySelector('#compileButton');
  const linksTextarea = document.querySelector('#linksTextarea');
  const linkList = document.querySelector('#linkList');


  const buffer = new LinkBuffer(linkList)

  compileButton.onclick = async () => {
    const links = linksTextarea.value.split('\n')
    .map(el => el.trim())
    .filter(el => el != '')

    if (links && links.length > 0) {
			buffer.addLinks(links)
    }

    linksTextarea.value = ''
  }

  convertButton.onclick = async () => {
    const link = buffer.consumeLink()

    if(link && link.length) {
      window.open(`./convert/link/${encodeURIComponent(btoa(link))}`, '_blank')
    }
  }
}
