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

    //   rem
    this.queries.push(query)

    //   this.list.removeChild(
    //     this.list.children.item(this.list.children.length - 1)
    //   )

    return query;
  }
}

function app() {
  const convertButton = document.querySelector('#convertButton');
  const compileButton = document.querySelector('#compileButton');
  const searchTextarea = document.querySelector('#searchTextarea');
  const queryList = document.querySelector('#queryList');


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

  convertButton.onclick = async () => {
    console.log('click convert');
    const query = buffer.consumeQuery()
    console.log('query:', query);
    if (query && query.length) {
      const res = await fetch(`./search/query/${encodeURIComponent(btoa(query))}`)
      const json = await res.json()
      console.log(json);
    }
  }
}
