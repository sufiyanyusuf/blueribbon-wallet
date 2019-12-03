import axios from 'axios';
import SInfo from 'react-native-sensitive-info';

export const getToken = async () => {
    return new Promise (async (resolve, reject) => {
        try {
            SInfo.getItem("accessToken", {}).then(accessToken => {
                resolve(accessToken)
            })
        }catch(e){
            reject(e)
        }
    })
}

export const getDeviceToken = async () => {
    return new Promise (async (resolve, reject) => {
        try {
            SInfo.getItem("deviceToken", {}).then(deviceToken => {
                resolve(deviceToken)
            })
        }catch(e){
            reject(e)
        }
    })
}

export const setDeviceToken = (token) => {
    SInfo.setItem("deviceToken", token, {});
}

export const uploadDeviceToken = async (deviceToken) => {
    return new Promise (async (resolve, reject) => {
        try {

            const token = await getToken()

            var config = {
                headers: {'Authorization': "bearer " + token}
            };
    
            var bodyParams = {
                token:deviceToken
            }

            axios.post('https://3458a3ef.ngrok.io/api/user/addNotificationToken',bodyParams,config)
                .then(res => {
                    console.log('uploaded')
                    resolve(true)
            })

        }catch(e){
            reject(e)
        }
    })
}

export const removeDeviceToken = async () => {

    return new Promise (async (resolve, reject) => {
        try {

            const token = await getToken()

            var config = {
                headers: {'Authorization': "bearer " + token}
            };

            var bodyParams = {}
    
            axios.post('https://3458a3ef.ngrok.io/api/user/removeNotificationToken',bodyParams, config)
                .then(res => {
                
                    console.log('removed')
                    resolve(true)
            })

        }catch(e){
            reject(e)
        }
    })
}

export const getUserLocations = async (token) => {
    
    return new Promise ((resolve, reject) => {

        try{
            var config = {
                headers: {'Authorization': "bearer " + token}
                };

            axios.get('https://3458a3ef.ngrok.io/api/user/savedLocations',config)
            .then(res => {
                console.log(res)
                resolve(res.data)
            })
        }catch(e){
            reject(e)
        }
    })
}

export const checkLocationEligibility = async (location,token,listingId) => {


    return new Promise ((resolve, reject) => {

        try{
            var config = {
                headers: {'Authorization': "bearer " + token}
                };

            var bodyParams = {
                'listingId':listingId,
                'coordinate':location
            }
            
            axios.post('https://3458a3ef.ngrok.io/api/user/checkLocationEligibility',bodyParams,config)
            .then(res => {
                console.log(res)
                resolve(res.data)
            })
        }catch(e){
            reject(e)
        }
    })
}

export const pauseSubscription = async (subscriptionId) => {
    return new Promise (async (resolve, reject) => {
        try {
            const token = await getToken()

            var config = {
                headers: {'Authorization': "bearer " + token}
            };
    
            var bodyParams = {
                subscriptionId:subscriptionId
            }

            let res = await axios.post('https://3458a3ef.ngrok.io/subscriptionManagment/pauseSubscription',bodyParams,config)
                
            if (res.status == 200) {
                resolve(res.data)
            } else {  
                resolve(false)
            }
            console.log('done')
        
        }catch(e){
            reject(e)
        }
    })
}

export const resumeSubscription = async (subscriptionId) => {
    return new Promise (async (resolve, reject) => {
        try {
            const token = await getToken()

            var config = {
                headers: {'Authorization': "bearer " + token}
            };
    
            var bodyParams = {
                subscriptionId:subscriptionId
            }

            let res = await axios.post('https://3458a3ef.ngrok.io/subscriptionManagment/resumeSubscription',bodyParams,config)
                
            if (res.status == 200) {
                resolve(res.data)
            } else {  
                resolve(false)
            }
            console.log('done')
        
        }catch(e){
            reject(e)
        }
    })
}
