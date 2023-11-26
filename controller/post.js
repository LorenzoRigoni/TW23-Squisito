// check if param is arrived
let searchParams = new URLSearchParams(window.location.search)
searchParams.has('id') // true
let param = searchParams.get('id')
alert (param)