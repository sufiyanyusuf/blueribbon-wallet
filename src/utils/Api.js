import axios from 'axios';
import SInfo from 'react-native-sensitive-info';

export const getToken = async () => {
    return new Promise ((resolve, reject) => {
        try {
            SInfo.getItem("accessToken", {}).then(accessToken => {
                resolve(accessToken)
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

            axios.get('https://2d9ab7a4.ngrok.io/api/user/savedLocations',config)
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
            
            axios.post('https://2d9ab7a4.ngrok.io/api/user/checkLocationEligibility',bodyParams,config)
            .then(res => {
                console.log(res)
                resolve(res.data)
            })
        }catch(e){
            reject(e)
        }
    })
}


