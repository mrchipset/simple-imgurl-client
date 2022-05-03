import axios from "axios";

// const baseURL = 'http://localhost/api/'
const baseURL = '/api/'

interface ListItem {
    Key: string,
    ContentType: string,
    LastModified: string
}

class Service {
    constructor() {

    }

    Get(bucket: string, object: string): string {
        return baseURL + 'obj/' + bucket + '/' + object
    }

    async Put(bucket: string, object: string, file: File): Promise<boolean> {
        const url = baseURL + 'obj/' + bucket + '/'+ object
        let ret = false
        axios({
            method:'put',
            url: url,
            data: file.text,
            headers: {
                'Content-Type': file.type,
                'Access-Control-Allow-Origin': '*',
            }
        }).then(function (response) {
            ret = response.status === 200
        }).catch(function (error) {
            console.log(error)
        }).finally(function() {
            console.log('finish request')
        })
        return ret;
    }

    async List(bucket: string): Promise<ListItem[]> {
        const url = baseURL + 'list/' + bucket
        return new Promise(resolve => {
            axios({
                method:'get',
                url: url,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }).then(async function (response) {
                console.log(response.status)
                if (response.status === 200) {
                    const body = response.data
                    resolve(body)
                } else
                {
                    resolve([])
                }
            }).catch(function (error) {
                console.log(error)
                resolve([])
            }).finally(function() {
                console.log('finish request')
            })
        })
       
    }

    async Delete(bucket: string, object: string): Promise<boolean> {
        const url = baseURL + 'obj/' + bucket + '/'+ object
        return new Promise((resolve) => {
            let ret = false
            axios({
                method:'delete',
                url: url,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }).then(function (response) {
                resolve(response.status === 200)
            }).catch(function (error) {
                console.log(error)
                resolve(false)
            }).finally(function() {
                console.log('finish request')
            })
        })

    }
}

const service = new Service();

export default service;