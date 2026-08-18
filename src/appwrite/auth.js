import config from "../config/config";

import { Client, Account, ID } from "appwrite";


class AuthService {

    client =  new Client();
    account; 

    constructor() {

        // only creating it, when object is instantiated, and not in the class, to save resources? 
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

        this.account = new Account(this.client); 
    }

    async createAccount({name,email,password}) 
    {
        try {

            const userAccount = await this.account.create(ID.unique(), email, password, name);
            // call login() method

            this.login({email,password})
            
            if (userAccount) {
                
            } else {

                return userAccount;
                
            }
            
        } catch (error) {
            
            throw error;
        }

    }

    async login({email, password})
        {
            try {

                return await this.account.createEmailPasswordSession(email,password)
                
            } catch (error) {
                throw error;
            }
        }

    async getCurrentUser() 
        {
            try {

                return await this.account.get(); // will return null, if no account found of user 
                
            } catch (error) {
                throw error;
            }

            return null; // fallback case, in case catch returned something, which our program unable to handle
        }

        async logout()
            {
                try {

                    return await this.account.deleteSessions(); // log out from all the devices 
                    
                } catch (error) {
                    
                    throw error
                }
            }
}

const authService = new AuthService();

export default authService; 