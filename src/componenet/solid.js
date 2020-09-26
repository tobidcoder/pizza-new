//Http request
const httpRequest = (url, setState) => {
    http.get(url, (res) => setState.setValues(res))
   };
   
   //State set in another function
   const setState = {
    setValues: (res) => {
     this.setState({
       key1: res.value1,
       key2: res.value2,
       key3: res.value3
     })
    }
   }
   //Http request, state set in a different function
   httpRequest("http://address/api/examples", setState);