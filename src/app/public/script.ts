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
  private list: Element
  private links: string[]

  constructor(htmlList: Element) {
    this.list = htmlList
    this.links = []
  }

  addLinks(urls: string[]): void {
    urls.map((url) => {
      if (this.links.indexOf(url) == -1) {
        this.links.push(url)
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(url))
        this.list.appendChild(li)
      }
    })
  }

  consumeLink(): string | void {
    const link = this.links.pop()
    if (link) {
      const childToRemove = this.list.children.item(this.list.children.length - 1)
      if (childToRemove) this.list.removeChild(childToRemove)

      return link;
    }
  }
}

function app() {
  const convertButton: HTMLElement | null = document.querySelector('#convertButton');
  const compileButton: HTMLElement | null = document.querySelector('#compileButton');
  const linksTextarea: HTMLTextAreaElement | null = document.querySelector('#linksTextarea');
  const linkList: HTMLUListElement | null = document.querySelector('#linkList');

  if (linkList) {
    const buffer = new LinkBuffer(linkList)

    if (compileButton && linksTextarea) compileButton.onclick = async () => {
      const links = linksTextarea.value.split('\n')
        .map(el => el.trim())
        .filter(el => el != '')

      if (links && links.length > 0) {
        buffer.addLinks(links)
      }

      linksTextarea.value = ''
    }

    if (convertButton) convertButton.onclick = async () => {
      const link = buffer.consumeLink()

      if (link && link.length) {
        window.open(`./convert/link/${encodeURIComponent(btoa(link))}`, '_blank')
      }
    }
  }
}
