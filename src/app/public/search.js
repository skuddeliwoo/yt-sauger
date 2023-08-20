if (document.readyState == 'loading') {
  document.onreadystatechange = function () {
    if (document.readyState == 'interactive') {
      app();
    }
  }
} else {
  app();
}

class QueryBuffer {
  constructor(htmlList) {
    this.list = htmlList
    this.queries = []
  }

  addQuery(urls) {
    urls.map((url) => {
      if (this.queries.indexOf(url) == -1) {
        this.queries.push(url)

        let li = document.createElement('li')
        li.appendChild(document.createTextNode(url))
        this.list.appendChild(li)
      }
    })
  }

  consumeQuery() {
    const query = this.queries.pop()

    this.list.removeChild(
      this.list.children.item(this.list.children.length - 1)
    )

    return query;
  }
}

function createDownloadFn(option) {
  return async () => {
    console.log('click download');
    const res = await fetch(`./convert/link/${encodeURIComponent(btoa(option.url))}`)
    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = `${option.title}.mp3`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
  }
}

function addOptions(ul, options) {
  options.map((option) => {
    const views = String(option.views).padStart(10, ' ')
    let li = document.createElement('li')
    let btn = document.createElement('button')
    btn.appendChild(document.createTextNode('download'))
    btn.onclick = createDownloadFn(option)
    li.appendChild(btn)
    li.appendChild(document.createTextNode(
      `${views} | ${option.title} (${option.timestamp}) | ${option.author.name}`
    ))
    ul.appendChild(li)
  })
}

function app() {
  const searchButton = document.querySelector('#searchButton');
  const compileButton = document.querySelector('#compileButton');
  const searchTextarea = document.querySelector('#searchTextarea');
  const queryList = document.querySelector('#queryList');
  const optionsList = document.querySelector('#optionsList');


  const buffer = new QueryBuffer(queryList)

  compileButton.onclick = async () => {
    const queries = searchTextarea.value.split('\n')
      .map(el => el.trim())
      .filter(el => el != '')

    if (queries && queries.length > 0) {
      buffer.addQuery(queries)
    }

    searchTextarea.value = ''
  }

  searchButton.onclick = async () => {
    console.log('click search');
    const query = buffer.consumeQuery()
    console.log('query:', query);
    if (query && query.length) {
      const res = await fetch(`./search/query/${encodeURIComponent(btoa(query))}`)
      const json = await res.json()
      console.log(json);
      addOptions(optionsList, json)
    }
  }
}
