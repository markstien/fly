import axios from 'axios';

axios({
    method:"get",
    url:"http://localhost:8080/static/c.jpg"
}).then(e => {
    console.log(e.data);
}).catch( error => {
    console.log(error);
})
