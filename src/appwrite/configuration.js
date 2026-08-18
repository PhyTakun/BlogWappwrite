import { ID, Databases, Storage, Client, Query } from "appwrite";
import config from "../config/config";


export class Service 
    {
        client = new Client(); 
        databases;
        bucket;


        constructor(){
        
        // objects are created, and the variables are referring them
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);

        this.bucket = new Storage(this.client); 

        }


        async createPost({title, slug,  content, featuredImage, status, userId})
            {
                try {    
                    return await this.databases.createDocument(
                        config.appwriteDatabaseId,
                        config.appwriteTableName,
                        slug,
                        {
                            title,
                            content,
                            featuredImage,
                            status,
                            userId
                        }
                    )   
                } 
                catch (error) {
                    console.log(`Create post error :: ${error}`);
                    return false
                    
                }
            }

        async updatePost(slug,{title, featuredImage,  content,status})
            {
                try {
                    
                    return await this.databases.updateDocument(
                        config.appwriteDatabaseId,
                        config.appwriteTableName,
                        slug,
                        {
                            title,
                            content,
                            featuredImage,
                            status
                        }
                    )     
                } 
                
                catch (error) {
                    
                    console.log(`update post error :: ${error}`);
                    
                }
            }
        async deletePost(slug)
            {
                try {
                    
                    return await this.databases.deleteDocument(
                    config.appwriteDatabaseId,
                    config.appwriteTableName,
                    slug
                )
                return true;
                } 
                catch (error) {
                    
                    console.log(`delete post error :: ${error}`);
                    return false;
                }

            }
        async getPost(slug)
            {
                try {
                    return await this.databases.getDocument(
                        config.appwriteDatabaseId,
                        config.appwriteTableName,
                        slug
                    )    
                } 
                
                catch (error) {
                    
                    console.log(`get Post error :: ${error}`);
                    return false;
                    
                }
            }

        async getPosts(queries = [Query.equal("status", "active")]) // query is typed inside array. Multiple queries can be inserted within
            {                                                       // only applicable to indexes 
                try {

                    return await this.databases.listDocuments(
                        config.appwriteDatabaseId,
                        config.appwriteTableName,
                        queries  // only return records where the query is true
                                
                    )            
                } 
                catch (error) {
                    console.log(`get all posts error :: ${error}`);
                    return false;
                }
            }

        // file related services

        async uploadFile(file)
            {
                try {
                    return await this.bucket.createFile(
                        config.appwriteBucketId,
                        ID.unique(),
                        file
                    )
                                 
                }               
                catch (error) {
                    console.log(`file upload failed :: ${error}`);
                    return false;                    
                }
            }
        async deleteFile(fileId)
            {
                try {
                    return await this.bucket.deleteFile(
                        config.appwriteBucketId,
                        fileId
                    )
                       
                    
                }              
                catch (error) {
                    console.log(`delete file failed :: ${error}`);
                    return false;
                    
                }
            }

         thumbnailPreview(fileId)  // it runs locally, no need for async, a sync func
                                    // all async func returns a promise, so in the end the urlstring, was 
                                    // wrapped to a promise, so that's why the img wasn't making any n/w calls
            {
                try {
                    const file =  this.bucket.getFileView(
                        config.appwriteBucketId,
                        fileId
                        
                    )

                    console.log('file in thumbnail preview', file);
                    return file
                    
                } 
                
                catch (error) {
                    console.log(`Thumbnail Preview Failed :: ${error}`);
                    return false;                          
                }
            }
    } 


const service = new Service();

export default service; 