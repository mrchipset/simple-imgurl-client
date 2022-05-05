import axios from "axios";
import { read } from "fs";

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
        const ext = file.type.split('/')[1]
        const url = baseURL + 'obj/' + bucket + '/'+ object + '.' + ext
        let ret = false
        var fileReader = new FileReader()
     
        return new Promise(resolve => {
            fileReader.onload = (e) => {
                const data = e.target?.result
                axios({
                    method:'put',
                    url: url,
                    data: data,
                    headers: {
                        'Content-Type': file.type,
                    }
                }).then(function (response) {
                    ret = response.status === 200
                    resolve(ret)
                }).catch(function (error) {
                    console.log(error)
                    resolve(false)
                }).finally(function() {
                    console.log('finish request')
                })
            }
            fileReader.readAsArrayBuffer(file)

        })
        
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