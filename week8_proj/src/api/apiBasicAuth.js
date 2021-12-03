import apiClient from './clientBasicAuth';

const endpoint = "/auth/login";

const postToken = async (email, password)=> {
    let response = await apiClient(email,password).post(endpoint)
    let error, token = ''
    if (!response.ok){error = "Unexpected error plase Try Again!"}
    if (response.status === 401) {error = "Invalid Email/Password Combo"}
    if (response.ok){token = response.data.token}
    return{"error":error, token}
}

export default postToken
