import axios from "axios";

const baseURL = 'http://localhost/api/'

class Service {
    constructor() {

    }

    Get(bucket: string, object: string): string {
        return baseURL + bucket + '/' + object
    }

    Put(bucket: string, object: string, file: File): boolean {
        const url = baseURL + 'object/' + bucket + '/'+ object
        axios({
            method:'put',
            url: url,
            data: file.text,
            headers: {
                'Content-Type': file.type,
                'Access-Control-Allow-Origin': '*',
            }
        }).then(function (response) {
            console.log(response.status)
            return true
        }).catch(function (error) {
            console.log(error)
        }).finally(function() {
            console.log('finish request')
        })
        return true;
    }
}

const service = new Service();

export default service;